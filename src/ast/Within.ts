import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Statement from "./Statement";
import { Selector } from "./Selector";

export default class Within extends Node {

    selector: Selector;
    statements: Node[] = [];
    
    public parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token !== Tokens.WITHIN) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Within] and received: [${token}] instead`);
        }
        tokenizer.pop();

        this.selector = new Selector();
        this.selector.parse(tokenizer);

        while(tokenizer.hasNext() && tokenizer.top() !== Tokens.ENDWITHIN) {
            let s: Node = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statements.push(s);
        }

        currentLine = tokenizer.getLine();
        if(tokenizer.pop() !== Tokens.ENDWITHIN) {
            throw new ParserError(`Missing EndWithin keyword at line ${currentLine}.`);
        }
    }    
    
    public async evaluate() {
        Node.addWithinPrefix(this.selector.name);
        for (var s of this.statements) {
			await s.evaluate();
		}
        Node.removeWithinPrefix();
    }


}