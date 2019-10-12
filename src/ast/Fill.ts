import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";
import Value from "./Value";

export default class Fill extends Node{
    
    value: Value;

    public parse(tokenizer: Tokenizer) {
		tokenizer.pop();
    this.value = new Value();
    this.value.parse(tokenizer);
    }

    public async evaluate() {
      this.value.evaluate().then((val) => {
        return Node.page.keyboard.type(val);
      }).catch(e => {
        return Promise.reject(e)
      })
    }

}
