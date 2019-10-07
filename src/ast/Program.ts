import { Node } from './Node';
import Statement from "./Statement";
import Tokens from '../libs/Tokens';
import { ParserError } from '../errors/ParserError';
import Tokenizer from '../libs/Tokenizer';
const puppeteer = require('puppeteer');

export default class Program extends Node {

    statements: Node[] = [];
    
    public parse(tokenizer: Tokenizer){
        console.log("in program parse")
        // first statement must be Visit
        if (tokenizer.top() !== Tokens.VISIT) {
            throw new ParserError("Must start from visit statement");
        }

        while(tokenizer.hasNext() && tokenizer.top() !== null) {
            let s: Node = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statements.push(s);
        }

    }

    public async evaluate() {
		const browser = await puppeteer.launch({
			headless: false,
			args: [
				'--proxy-server="direct://"',
				'--proxy-bypass-list=*'
			]
		});
		const page = await browser.newPage();
		Node.setPage(page);
		for (var s of this.statements) {
			await s.evaluate();
		}
        await browser.close();
        Node.printResult();
    }
}