import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";
import Tokens from "../libs/Tokens";

export default class Wait extends Node{
    latency: number;

    public parse(tokenizer: Tokenizer) {
      let currentLine = tokenizer.getLine();
      tokenizer.pop();
      let token = tokenizer.pop();
        if (token.match(Tokens.NUMMBER)) {
          this.latency = Number(token);
        } else {
          throw new ParserError(`Invalid value at line ${currentLine}.`);
        }
    }

    public async evaluate() {
		await Node.page.waitFor(this.latency);
    }
}
