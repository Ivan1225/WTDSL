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
        this.programStatus = ProgramStatus.initialize;
    }

    public parse() {
        try{
            this.wtProgram.parse(this.tokenizer);
            // console.log("Parse success");
            this.programStatus = ProgramStatus.ParserSuccess;
        } catch(e){
            console.log(e);
            this.programStatus = ProgramStatus.ParserFail;
        } finally {
            return this.programStatus;
        }
    }

    public async evaluation() {
        let that = this;
        try{
            await this.wtProgram.evaluate();
            that.programStatus = ProgramStatus.success;
        } catch(e) {
            that.programStatus = ProgramStatus.EvaluationFail;
            console.log(e)
        } finally {
            return this.programStatus;
        }
    }
}

export enum ProgramStatus {
    initialize,
    success,
    ParserSuccess,
    ParserFail,
    EvaluationFail
}