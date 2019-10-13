import Program from "../ast/Program";
import Tokenizer from "../libs/Tokenizer";

export class WTProgram {

    source: string;
    tokenizer: Tokenizer;
    wtProgram: Program;
    programStatus: ProgramStatus;

    /**
     *  fileName: input program file path
     */
    constructor(filePath: string) {
        Tokenizer.makeTokenizer(filePath)
        this.tokenizer = Tokenizer.getTokenizer();
        this.wtProgram = new Program();
        this.programStatus = ProgramStatus.INITIALIZE;
    }

    public parse() {
        try{
            this.wtProgram.parse(this.tokenizer);
            // console.log("Parse success");
            this.programStatus = ProgramStatus.PARSERSUCCESS;
        } catch(e){
            console.log(e.message);
            this.programStatus = ProgramStatus.PARSERFAIL;
        } finally {
            return this.programStatus;
        }
    }

    public async evaluation() {
        let that = this;
        try{
            await this.wtProgram.evaluate();
            that.programStatus = ProgramStatus.SUCCESS;
        } catch(e) {
            that.programStatus = ProgramStatus.EVALUATIONFAIL;
            console.log(e.message)
        } finally {
            return this.programStatus;
        }
    }
}

export enum ProgramStatus {
    INITIALIZE,
    SUCCESS,
    PARSERSUCCESS,
    PARSERFAIL,
    EVALUATIONFAIL
}