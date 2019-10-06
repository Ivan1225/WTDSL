import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";

export default class Wait extends Node{
    latency: number;

    public parse(tokenizer: Tokenizer) {
      tokenizer.pop();
      try {
        this.latency = Number(tokenizer.pop());
      } catch {
        throw new ParserError("Incorrect format of wait time")
      }
    }

    public evaluate() {
    }
}
