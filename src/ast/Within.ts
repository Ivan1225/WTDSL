import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Utils from "../libs/Utils";
import Statement from "./Statement";

export default class Within extends Node {

    selector: string;
    statements: Node[] = [];
    
    public parse(tokenizer: Tokenizer) {
        tokenizer.pop();
        let currentLine = tokenizer.getLine();

        let token = tokenizer.top();
        if (!token.match(Tokens.SELECTOR)) {
            throw new ParserError(`Invalid Selector format at line ${currentLine}. Parser was expecting: [{selector}] and received: [${token}] instead`);
        }

        this.selector = Utils.trimCurlyBraces(tokenizer.pop());

        while(tokenizer.hasNext() && tokenizer.top() !== Tokens.ENDWITHIN) {
            let s: Node = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statements.push(s);
        }

        tokenizer.pop();
    }    
    
    public evaluate() {
        throw new Error("Method not implemented.");
    }


}