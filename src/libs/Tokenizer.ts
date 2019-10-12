import * as fs from 'fs';
import * as path from 'path';
import { ParserError } from '../errors/ParserError';

export default class Tokenizer {
  private static theTokenizer: Tokenizer;

  program: string;

  tokens: string[];

  currentTokenIdx: number;

  line: number;

  column: number;

  public static getTokenizer(): Tokenizer {
    return Tokenizer.theTokenizer;
  }

  public static makeTokenizer(fileName: string) {
    if (Tokenizer.theTokenizer == null) {
      this.theTokenizer = new Tokenizer(fileName);
    }
  }

  private constructor(fileName: string) {
    try {
      this.program = fs.readFileSync(path.join(__dirname, "../../resources", fileName)).toString('utf-8');
    } catch (err) {
      throw new ParserError("Unable to load source: ${filename}");
    }
    this.tokenize();
  }

  private tokenize() {
    let k = '$HAHA$'
    this.tokens = this.program.replace(/".*"/g, function(x) {
      return x.replace(/\s/g, k)
    }).replace(/\({.*}(,\s{.*})*\)/g, function(x) {
      return x.replace(/,/g, ' ')
    }).
    replace(/\({|}\)/g, function(x) {
      return x.substring(0, 1) + ' ' + x.substring(1)
    }).split('\n').join(' NEW_LINE ').match(/\S+/g) || [];
    this.tokens.forEach(function(element, index, array) {
      array[index] = element.replace(k, ' ')
    })
    this.currentTokenIdx = 0;
    this.line = 1;
    this.column = 0;
  }

  public top(): string {
    if (this.currentTokenIdx < this.tokens.length) {
      // ignore blank lines
      while ("NEW_LINE" === this.tokens[this.currentTokenIdx]) {
        this.currentTokenIdx += 1;
        this.line += 1;
        this.column = 0;
      }
      return this.tokens[this.currentTokenIdx];
    }
    return null;
  }

  public pop(): string {
    if (this.top() != null) {
      let token = this.tokens[this.currentTokenIdx];
      this.currentTokenIdx += 1;
      this.column += 1;
      return token;
    }
    return null;
  }

  public hasNext(): boolean {
    return this.top() !== null;
  }

  public getLine(): number {
    return this.line;
  }
}