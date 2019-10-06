import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";

export default class Wait extends Node{
    latency: number;

    public parse(tokenizer: Tokenizer) {
      let currentLine = tokenizer.getLine();
      tokenizer.pop();
      try {
        this.latency = Number(tokenizer.pop());
      } catch {
        throw new ParserError("Error: Incorrect format of wait time at line ${currentLine}")
      }
    }

    public evaluate() {
    }
}
