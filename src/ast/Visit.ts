import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";
import Tokens from '../libs/Tokens';

export default class Visit extends Node{
    url: string;

    public parse(tokenizer: Tokenizer) {
      let currentLine = tokenizer.getLine();
      let token = tokenizer.top();
      if (token !== Tokens.VISIT) {
          throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Visit] and received: [${token}] instead`);
      }
      tokenizer.pop();

      this.url = tokenizer.pop();

      if (!this.validURL(this.url)) {
        throw new ParserError(`Invalid url at line ${currentLine}.`);
      }
    }

    public async evaluate() {
    Node.printOutput(`loading this page:  ${this.url}`);
    await Node.page.goto(this.url);
    Node.printOutput(`loaded this page:  ${this.url}`);
    }

    private validURL(str) {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }
}
