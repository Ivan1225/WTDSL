import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import { EvaluationError } from "../errors/EvaluationError";
import Utils from "../libs/Utils";

export default class Select extends Node {

    selector: string;
    
    public parse(tokenizer: Tokenizer) {
        tokenizer.pop();
        let currentLine = tokenizer.getLine();

        let token = tokenizer.top();
        if (!token.match(Tokens.SELECTOR)) {
            throw new ParserError(`Invalid Selector format at line ${currentLine}. Parser was expecting: [{selector}] and received: [${token}] instead`);
        }

        this.selector = Utils.trimBrackets(tokenizer.pop());
    }    
    
    public async evaluate() {
		console.log(this.selector);
		let matches = await Node.page.$$eval(this.selector, nodes => nodes.length);
		if (matches === 1){
			Node.setSelector(this.selector);
		} else if (matches === 0) {
			throw new EvaluationError('Your selector ' + this.selector + ' did not match anything');
		} else {
			throw new EvaluationError('Your selector ' + this.selector + ' is too general and matches ' + matches + ' items');
		}
    }


}