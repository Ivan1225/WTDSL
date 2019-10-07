import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import { EvaluationError } from "../errors/EvaluationError";
import Utils from "../libs/Utils";
import {Node} from "./Node";

export default class Value {

    val: any
    type: ValueType;

    constructor(val, type) {
        this.val = val;
        this.type = type;
    }

    public getVal() {
        return this.val;
    }

    public getType() {
        return this.type;
    }

    public static getValue(tokenizer: Tokenizer) {
        if (tokenizer.top().match(Tokens.VARIABLENAME)) {
            return this.getVaraibleName(tokenizer);
        }

        return VariableValue.getVariableValue(tokenizer);
    }

    public static getVaraibleName(tokenizer: Tokenizer) {
        if (!tokenizer.top().match(Tokens.VARIABLENAME)) {
            let currentLine = tokenizer.getLine();
            throw new ParserError(`Invalid variable name at line ${currentLine}.`);
        }

        return new Value(tokenizer.pop(), ValueType.VariableName);
    }

	public async evaluate() {
		switch(this.type) {
			case ValueType.Number || ValueType.String:
				return this.val;
			case ValueType.AttributeName:
				return await Node.page.$eval(Node.selector, (e, v) => e[v], this.val);;
			case ValueType.VariableName:
				if(this.val in Node.nameTable) {
					return Node.nameTable[this.val];
				} else {
					throw new EvaluationError('Variable ' + this.val + ' is undefined.');
				}
			default:
				throw new EvaluationError('Unable to resolve value, ' + this.val + ' of type, ' + this.type);
				
		}
			
	}
}

export class VariableValue extends Value {
   
    public static getVariableValue(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();

        if (token.match(Tokens.NUMMBER)) {
            return NumberValue.getNumberValue(tokenizer);
        }

        if (token.match(Tokens.ATTRIBUTE)) {
            return AtrributeName.getAttributeName(tokenizer);
        }

        if (token.match(Tokens.STRING) || token.match(Tokens.STRINGSTART)) {
            return StringValue.getStringValue(tokenizer);
        }

        throw new ParserError(`Invalid value at line ${currentLine}.`);
        
    }
    
}

export class StringValue extends VariableValue{
    public static getStringValue(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        if (tokenizer.top().match(Tokens.STRING)) {
            let token = tokenizer.pop();
            return new Value(Utils.trimQuotationMark(token), ValueType.String);
        }

        if (!tokenizer.top().match(Tokens.STRINGSTART)) {
            throw new ParserError(`Invalid string value at line ${currentLine}.`);
        }

        let rst = Utils.trimbeginQuotationMark(tokenizer.pop());

        while(tokenizer.top().match(Tokens.STRINGMIDDLE) && !tokenizer.top().match(Tokens.STRINGEND)) {
            rst += (" " + tokenizer.pop());

            if (tokenizer.top() == null) {
                throw new ParserError(`Invalid string value at line ${currentLine}.`);
            }
        }

        rst += " " + Utils.trimEndQuotationMark(tokenizer.pop());
        
        return new Value(rst, ValueType.String);
    }
}

export class NumberValue extends VariableValue {
    public static getNumberValue(tokenizer: Tokenizer) {
        if (!tokenizer.top().match(Tokens.NUMMBER)) {
            let currentLine = tokenizer.getLine();
            throw new ParserError(`Invalid number value at line ${currentLine}.`);
        }

        return new Value(parseInt(tokenizer.pop()), ValueType.Number);
    }
}

export class AtrributeName extends VariableValue {
    public static getAttributeName(tokenizer: Tokenizer) {
        if (!tokenizer.top().match(Tokens.ATTRIBUTE)) {
            let currentLine = tokenizer.getLine();
            throw new ParserError(`Invalid Atrribute at line ${currentLine}.`);
        }

        return new Value(tokenizer.pop(), ValueType.AttributeName);
    }
}


export enum ValueType{
    Number = 0,
    String = 1,
    AttributeName = 2,
    VariableName = 3
}