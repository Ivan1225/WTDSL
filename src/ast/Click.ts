import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";

export default class Click extends Node {

    public parse(tokenizer: Tokenizer) {
        tokenizer.pop();
    }    
    
    public async evaluate() {
        await Node.page.click(Node.selector);
    }

}