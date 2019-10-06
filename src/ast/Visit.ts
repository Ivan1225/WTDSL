import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import Statement from "./Statement";

export default class Visit extends Statement{
    url: URL;

    public parse(tokenizer: Tokenizer) {
      tokenizer.top();
      try {
        this.url = new URL(tokenizer.top().replace(/"/g,""));
      } catch {
        throw new ParserError("Invalid URL");
      }
    }

    public evaluate() {
    }
}
