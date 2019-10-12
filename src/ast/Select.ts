import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import { Selector } from "./Selector";

export default class Select extends Node {

    selector: Node;
    
    public parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token !== Tokens.SELECT) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Select] and received: [${token}] instead`);
        }
        tokenizer.pop();

        this.selector = new Selector();
        this.selector.parse(tokenizer);
    }    
    
    public async evaluate() {
        return this.selector.evaluate();
    }

}
