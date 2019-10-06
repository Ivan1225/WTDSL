import { Node } from './Node';
import Statement from "./Statement";
import Tokens from '../libs/Tokens';
import { ParserError } from '../errors/ParserError';
import Tokenizer from '../libs/Tokenizer';

export default class Program extends Node {

    statments: Statement[] = [];
    
    parse(tokenizer: Tokenizer){
        console.log("in program parse")
        // first statment must be Visit
        if (tokenizer.top() !== Tokens.VISIT) {
            throw new ParserError("Must start from visit statment");
        }

        while(tokenizer.hasNext()) {
            let s: Statement = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statments.push(s);
        }

    }

    public evaluate() {
        
    }
}