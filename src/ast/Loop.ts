import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Utils from "../libs/Utils";
import Statement from "./Statement";
import Select from "./Select";
import {EvaluationError} from "../errors/EvaluationError";

export default class Loop extends Node {

    selectors: string[] = [];
    statements: Node[] = [];
    variableName: string;
    
    public parse(tokenizer: Tokenizer) {
        tokenizer.pop();
        let currentLine = tokenizer.getLine();

        this.variableName = tokenizer.pop();
        let token = tokenizer.pop();

        if (!token.match(Tokens.IN)) {
            throw new ParserError(`Invalid format at line ${currentLine}. Parser was expecting: in and received: [${token}] instead`);
        }

        this.selectors = Utils.trimBrackets(tokenizer.pop()).split(",");
        this.selectors.forEach(s => Utils.trimBrackets(s));

        while(tokenizer.hasNext() && tokenizer.top() !== Tokens.ENDFOR && tokenizer.top() !== null) {
            let s: Node = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statements.push(s);
        }

        currentLine = tokenizer.getLine();
        if(tokenizer.pop() !== Tokens.ENDFOR) {
            throw new ParserError(`Missing EndWithin keyword at line ${currentLine}.`);
        }
    }    
    
    public async evaluate() {
        console.log('begin evaluate loop');
        var index =0;
        while(index<this.selectors.length){
            Node.setSelector(this.selectors[index]);
            for (var s of this.statements) {
                await s.evaluate();
            }
            index++;
        }
        // throw new Error("Method not implemented.");
        console.log('End evaluate loop');
    }


}