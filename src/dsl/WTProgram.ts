import WithinStack from "../libs/WithinStack";
import Program from "../ast/Program";
import Tokenizer from "../libs/Tokenizer";

export class WTProgram {

    source: string;
    symbolTables: Map<string, any>;
    withinStack: WithinStack<string>;

    /**
     *  fileName: input program file path
     */
    constructor(filePath: string) {
        Tokenizer.makeTokenizer(filePath)
    }

    /**
     * run
     */
    public run() {
        var wtProgram: Program = new Program();
        try{
            wtProgram.parse();
            wtProgram.evaluate();
        } catch(e){

        }
    }

}