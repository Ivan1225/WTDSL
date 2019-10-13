import {Node} from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Tokens from "../libs/Tokens";
import {ParserError} from "../errors/ParserError";
import Statement from "./Statement";
import { Selector } from "./Selector";

export default class Loop extends Node {

    selectors: Selector[] = [];
    statements: Node[] = [];

    public parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token !== Tokens.FOR) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Expect] and received: [${token}] instead`);
        }
        tokenizer.pop();

        token = tokenizer.pop();
        if (token !== Tokens.EACH) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [each] and received: [${token}] instead`);
        }

        
        token = tokenizer.pop();
        if (!token.match(Tokens.IN)) {
            throw new ParserError(`Invalid format at line ${currentLine}. Parser was expecting: [in] and received: [${token}] instead`);
        }

        token = tokenizer.pop();
        if (token !== Tokens.SELECTORLISTSTART) {
            throw new ParserError(`Invalid format at line ${currentLine}. Parser was expecting: [(] and received: [${token}] instead`);
        }

        while (tokenizer.hasNext() && tokenizer.top() !== Tokens.SELECTORLISTEND) {
            let selector = new Selector();
            selector.parse(tokenizer);
            this.selectors.push(selector)
        }

        token = tokenizer.pop();
        if (token !== Tokens.SELECTORLISTEND) {
            throw new ParserError(`Invalid format at line ${currentLine}. Parser was expecting: [)] and received: [${token}] instead`);
        }

        while(tokenizer.hasNext() && tokenizer.top() !== Tokens.ENDFOR) {
            let s: Node = Statement.getSubStatement(tokenizer);
            s.parse(tokenizer);
            this.statements.push(s);
        }

        currentLine = tokenizer.getLine();
        if(tokenizer.pop() !== Tokens.ENDFOR) {
            throw new ParserError(`Missing EndFor keyword at line ${currentLine}.`);
        }
    }

    public async evaluate() {
        // console.log(this.selectors);
        // console.log('begin evaluate loop');
        // Node.printOutput(`Strating loop on list: ${this.selectors.forEach(v=> {return v.name})}`)
        var index =0;
        while(index<this.selectors.length){
            await this.selectors[index].evaluate();
            for (var s of this.statements) {
                await s.evaluate();
            }
            index++;
        }
        // Node.printOutput(`End loop on list`)
        // console.log('End evaluate loop');
    }


}