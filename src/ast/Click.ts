import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";

export default class Click extends Node {

    public parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token !== Tokens.CLICK) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Click] and received: [${token}] instead`);
        }
        tokenizer.pop();
    }    
    
    public async evaluate() {
        Node.printOutput(`Tring click on ${Node.selector}.`)
        await Node.page.click(Node.selector);
        Node.printOutput(`Clicked on ${Node.selector}.`)
    }

}