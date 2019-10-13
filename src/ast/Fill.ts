import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";
import Value from "./Value";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";

export default class Fill extends Node{
    
    value: Value;

    public parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token !== Tokens.FILL) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Fill] and received: [${token}] instead`);
        }
        tokenizer.pop();

    this.value = new Value();
    this.value.parse(tokenizer);
    }

    public async evaluate() {
      this.value.evaluate().then((val) => {
        Node.printOutput(`Tring fill ${val} on element: ${Node.selector}`)
        return Node.page.keyboard.type(val);
      }).catch(e => {
        return Promise.reject(e)
      })
    }

}
