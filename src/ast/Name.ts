import { Node } from './Node';
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import { VariableValue } from './Value';

export default class Name extends Node {

    variableName: string;
    variableValue: VariableValue;
    
    parse(tokenizer: Tokenizer) {
        tokenizer.pop();
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if(tokenizer.pop() !== Tokens.OF) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [of] and received: [${token}] instead`);
        }

        token = tokenizer.top();
        if(!token.match(Tokens.VARIABLENAME)) {
            throw new ParserError(`Invalid variable name [${token}] at line ${currentLine}.`);
        }

        this.variableName = tokenizer.pop()
        
        token = tokenizer.top();
        if(tokenizer.pop() !== Tokens.IS) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [is] and received: [${token}] instead`);
        }

        this.variableValue = VariableValue.getVariableValue(tokenizer);
    }    
    
    
    evaluate() {
        throw new Error("Method not implemented.");
    }


}