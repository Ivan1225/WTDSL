import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Value, { Attribute } from "./Value";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Utils from "../libs/Utils";

export default class Assertion extends Node {
   
    targetAttribute: Attribute;
    assertionType: AssertionType;
    expectValue: Value;
   
    public parse(tokenizer: Tokenizer) {
        let currentLine = tokenizer.getLine();
        let token = tokenizer.top();
        if (token !== Tokens.EXPECT) {
            throw new ParserError(`Invalid token at line ${currentLine}. Parser was expecting: [Expect] and received: [${token}] instead`);
        }
        tokenizer.pop();

        this.targetAttribute = new Attribute();
        this.targetAttribute.parse(tokenizer);
        
        token = tokenizer.top()
        if (token !== Tokens.SHOULD) {
            throw new ParserError(`Invalid Assertion key word at line ${currentLine}. Parser was expecting: [should] and received: [${token}] instead`);
        }
        tokenizer.pop();
        
        token = tokenizer.pop();
        switch(token) {
            case Tokens.BE:
                this.assertionType = AssertionType.Be;
                break;
            case Tokens.CONTAIN:
                this.assertionType = AssertionType.Contain;
                break;
            case Tokens.NOT:
                token = tokenizer.pop()
                if (token == Tokens.BE) {
                    this.assertionType = AssertionType.NotBe;
                } else if (token == Tokens.CONTAIN) {
                    this.assertionType = AssertionType.NotContain;
                } else {
                    throw new ParserError(`Invalid Assertion type at line ${currentLine}.`);
                }
                break;
            default:     
                throw new ParserError(`Invalid Assertion type at line ${currentLine}.`);
        }

        this.expectValue = new Value();
        this.expectValue.parse(tokenizer);
    }    
    
    public async evaluate() {
        const selector: string = Node.selector;
        const page = Node.page;
		let resolvedValue = await this.expectValue.evaluate()
        let attributeVal = await page.$eval(selector, (e, v) => e[v] || e.attributes[v].value, this.targetAttribute);
        switch (this.assertionType) {
            case AssertionType.Be:
                this.assertionHelper(attributeVal === resolvedValue);
                break;
            case AssertionType.NotBe:
                this.assertionHelper(attributeVal !== resolvedValue);
                break;
            case AssertionType.Contain:
                this.assertionHelper(attributeVal.includes(resolvedValue));
                break;
            case AssertionType.NotContain:
                this.assertionHelper(!attributeVal.includes(resolvedValue));
                break;
        }
    }

    private assertionHelper(cond) {
        cond ? Node.testPass() : Node.testFail();
    }
}


export enum AssertionType{
    Be,
    NotBe,
    Contain,
    NotContain
}