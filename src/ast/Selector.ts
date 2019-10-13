import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Utils from "../libs/Utils";
import { EvaluationError } from "../errors/EvaluationError";

export class Selector extends Node {

    public name: string;
    
    parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (!token.match(Tokens.SELECTOR)) {
            throw new ParserError(`Invalid Selector format at line ${currentLine}. Parser was expecting: [{selector}] and received: [${token}] instead`);
        }
        
        this.name = Utils.trimBrackets(tokenizer.pop());
    }    
    
    async evaluate() {
        const prefixes =  Node.withinPrefixes;
		const selectorWithPreFixs = prefixes ? `${prefixes.reduce((acc, curr) => `${acc} ${curr}`,  '')} ${this.name}`: this.name
        const matches = await Node.page.$$eval(selectorWithPreFixs, nodes => nodes.length);
		if (matches === 1){
			Node.setSelector(selectorWithPreFixs);
		} else if (matches === 0) {
			throw new EvaluationError('Your selector ' + selectorWithPreFixs + ' did not match anything');
		} else {
			throw new EvaluationError('Your selector ' + selectorWithPreFixs + ' is too general and matches ' + matches + ' items');
        }

        return Node.page.$$eval(selectorWithPreFixs, nodes => nodes.length).then((n) => {
            if (matches === 1){
                Node.setSelector(selectorWithPreFixs);
            } else if (matches === 0) {
                return Promise.reject(new EvaluationError('Your selector ' + selectorWithPreFixs + ' did not match anything'));
            } else {
                return Promise.reject(new EvaluationError('Your selector ' + selectorWithPreFixs + ' is too general and matches ' + matches + ' items'));
            }
        })
    }

}