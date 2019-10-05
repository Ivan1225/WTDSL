import WithinStack from "../libs/WithinStack";
import Program from "../ast/Program";

export class WTProgram {

    source: string;
    symbolTables: Map<string, any>;
    withinStack: WithinStack<string>;

    /**
     *  fileName: input program file path
     */
    constructor(filePath) {
        // TODO:
        // using tokenizer to get token list of file
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