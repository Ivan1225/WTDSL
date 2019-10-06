import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";
import Value from "./Value";

export default class Fill extends Node{
    value: Value;

    public parse(tokenizer: Tokenizer) {
      tokenizer.pop();
      this.value = Value.getValue(tokenizer);
    }

    public evaluate() {
    }
}
