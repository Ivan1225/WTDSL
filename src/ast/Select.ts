import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import { EvaluationError } from "../errors/EvaluationError";
import Utils from "../libs/Utils";

export default class Select extends Node {

    selector: string;

	private checkSelector(nodes, s) {
		if(nodes.length === 1) {
			return nodes[0];
		} else if(nodes.length === 0) {
			throw new EvaluationError('Your selector' + s + 'did not match anything');
		} else {
			throw new EvaluationError('Your selector' + s + 'is too general and matches ' + nodes.length + ' items');
		}
	}
    
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
		await Node.page.$$eval(this.selector, CheckSelector, this.selector);
		Node.setSelector(this.selector);
    }


}