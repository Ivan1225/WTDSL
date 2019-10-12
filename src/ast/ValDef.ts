import { Node } from './Node';
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Value from './Value';

export default class ValDef extends Node {

    variableName: string;
    value: Value;
    
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

        this.value = new Value();
        this.value.parse(tokenizer);
    }
    
    async evaluate() {
        this.value.evaluate().then((val) => {
            Node.nameTable[this.variableName] = val;
            return Promise.resolve()
        }).catch(e => {return Promise.reject(e)})
    }


}