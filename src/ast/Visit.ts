import {ParserError} from '../errors/ParserError';
import Tokenizer from "../libs/Tokenizer";
import {Node} from "./Node";

export default class Visit extends Node{
    url: string;

    public parse(tokenizer: Tokenizer) {
      let currentLine = tokenizer.getLine();
      tokenizer.pop();
      this.url = tokenizer.pop().replace(/"/g,"");

      if (!this.validURL(this.url)) {
        throw new ParserError(`Invalid value at line ${currentLine}.`);
      }
    }

    public evaluate() {
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
