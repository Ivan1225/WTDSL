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
		console.log('begin wait');
		let ms_latency = this.latency*1000;
		await Node.page.waitFor(ms_latency);
		console.log('end wait');
    }
}
