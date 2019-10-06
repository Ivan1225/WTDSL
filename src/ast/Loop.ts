import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Utils from "../libs/Utils";
import Statement from "./Statement";

export default class Loop extends Node {

    selectors: string[] = [];
    statements: Node[] = [];
    variableName: string;
    
    public parse(tokenizer: Tokenizer) {
        tokenizer.pop();
        let currentLine = tokenizer.getLine();

        this.variableName = tokenizer.pop();
        let token = tokenizer.top();

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
    
    public evaluate() {
        throw new Error("Method not implemented.");
    }


}