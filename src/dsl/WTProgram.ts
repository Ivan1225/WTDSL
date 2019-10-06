import WithinStack from "../libs/WithinStack";
import Program from "../ast/Program";
import Tokenizer from "../libs/Tokenizer";

export class WTProgram {

    source: string;
    tokenizer: Tokenizer;
    symbolTables: Map<string, any>;
    withinStack: WithinStack<string>;

    /**
     *  fileName: input program file path
     */
    constructor(filePath: string) {
        Tokenizer.makeTokenizer(filePath)
        this.tokenizer = Tokenizer.getTokenizer();
    }

    /**
     * run
     */
    public run() {
        var wtProgram: Program = new Program();
        try{
           // wtProgram.parse(this.tokenizer);
            wtProgram.evaluate();
        } catch(e){
            console.log("some error")
        }
		// print output
    }

}