import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";
import Tokens from "../libs/Tokens";

export default class Wait extends Node{
    latency: number;

    public parse(tokenizer: Tokenizer) {
      let currentLine = tokenizer.getLine();
      let token = tokenizer.top();
        if (token !== Tokens.WAIT) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Wait] and received: [${token}] instead`);
        }
        tokenizer.pop();


      token = tokenizer.pop();
        if (token.match(Tokens.NUMMBERVAL)) {
          this.latency = Number(token);
        } else {
          throw new ParserError(`Invalid value at line ${currentLine}.`);
        }
    }

    public async evaluate() {
    Node.printOutput(`starting wait ${this.latency} seconds`);
		let ms_latency = this.latency*1000;
    await Node.page.waitFor(ms_latency);
    Node.printOutput(`waited ${this.latency} seconds`);
    }
}
