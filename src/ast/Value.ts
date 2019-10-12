import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { EvaluationError } from "../errors/EvaluationError";
import Utils from "../libs/Utils";
import {Node} from "./Node";
import { ParserError } from "../errors/ParserError";

export default class Value extends Node {
    
    val: any;

    parse(tokenizer: Tokenizer) {
        let token = tokenizer.top();
        if (token.match(Tokens.STRINGVAL)) {
            this.val = new StringVal();
        }else if (token.match(Tokens.ATTRIBUTE)) {
            this.val = new Attribute();
        }else if (token.match(Tokens.NUMMBERVAL)) {
            this.val = new NumberVAl();
        } else {
            this.val = new VariableName();
        }
        this.val.parse(tokenizer);
    }

	public async evaluate() {
		return this.val.evaluate();
	}
}

export class NumberVAl extends Node {

    val: any;
    
    parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token.match(Tokens.NUMMBERVAL)) {
            this.val = tokenizer.pop();
        } else {
            throw new ParserError(`Invalid number value at line ${currentLine}.`);
        }
    }    
    
    evaluate() {
        return Promise.resolve(this.val)
    }
}

export class StringVal extends Node {
    
    val: string;
    
    parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token.match(Tokens.STRINGVAL)) {
            this.val = Utils.trimQuotationMark(tokenizer.pop());
        } else {
            throw new ParserError(`Invalid string value at line ${currentLine}.`);
        }
    }    
    
    async evaluate() {
        return Promise.resolve(this.val)
    }
}

export class Attribute extends Node {

    attributeName: any
    
    parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token.match(Tokens.ATTRIBUTE)) {
            this.attributeName = Utils.trimBrackets(tokenizer.pop());
        } else {
            throw new ParserError(`Invalid Attribute value at line ${currentLine}.`);
        }
    }    
    
    async evaluate() {
        return Node.page.$eval(Node.selector, (e, v) => e[v] || e.attributes[v].value, this.attributeName);
    }
}

export class VariableName extends Node {

    name: string;
    
    parse(tokenizer: Tokenizer) {
        this.name = tokenizer.pop();
    }    
    
    async evaluate() {
        if(this.name in Node.nameTable) {
            return Node.nameTable[this.name];
        } else {
            return Promise.reject(new EvaluationError('Variable ' + this.name + ' is undefined.'));
        }
    }
}
