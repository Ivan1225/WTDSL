import WithinStack from "../libs/WithinStack";
import Program from "../ast/Program";
import Tokenizer from "../libs/Tokenizer";

export class WTProgram {

    source: string;
    tokenizer: Tokenizer;
    static variablesTable: Map<string, any>;
    withinStack: WithinStack<string>;

    /**
     *  fileName: input program file path
     */
    constructor(filePath: string) {
        Tokenizer.makeTokenizer(filePath)
        this.tokenizer = Tokenizer.getTokenizer();
    }

    public parse() {
        var wtProgram: Program = new Program();
        try{
            wtProgram.parse(this.tokenizer);
            console.log("Parse success");
            return true;
        } catch(e){
            console.log(e);
            return false;
        }
		// print output
    }

    /**
     * run
     */
    public run() {
        var wtProgram: Program = new Program();
        try{
			wtProgram.parse(this.tokenizer);
            wtProgram.evaluate();
        } catch(e){
            console.log(e)
        }
		// print output
    }

}