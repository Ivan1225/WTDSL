import { Node } from './Node';
import Statement from "./Statement";
import Tokens from '../libs/Tokens';
import { ParserError } from '../errors/ParserError';
import Tokenizer from '../libs/Tokenizer';
const puppeteer = require('puppeteer');

export default class Program extends Node {

    statements: Node[] = [];
    
    public parse(tokenizer: Tokenizer){
        // console.log("in program parse")
        // first statement must be Visit
        if (tokenizer.top() !== Tokens.VISIT) {
            throw new ParserError("Must start from visit statement");
        }

        while(tokenizer.hasNext() && tokenizer.top() !== null) {
            let s: Node = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statements.push(s);
			// console.log(s);
        }

    }

    public async evaluate() {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: [
                    '--proxy-server="direct://"',
                    '--proxy-bypass-list=*'
                ]
            });
            const pages = await browser.pages();
            Node.setPage(pages[0]);
            try {
                for (var s of this.statements) {
                    await s.evaluate();
                }
            } catch(e){
                console.log('Error occured when evaluating statements: ' + e.message);
            }
            await browser.close();
        } catch(e){
            console.log('Error occured when evaluating program: ' + e.message);
        } finally {
            Node.printResult();
        }
    }
}