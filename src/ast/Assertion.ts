import { Node } from "./Node";
import Tokenizer from "../libs/Tokenizer";
import Value, { AtrributeName } from "./Value";
import Tokens from "../libs/Tokens";
import { ParserError } from "../errors/ParserError";
import Utils from "../libs/Utils";

export default class Assertion extends Node {
   
    targetAttributeName: AtrributeName;
    assertionType: AssertionType;
    expectValue: Value;
   
    public parse(tokenizer: Tokenizer) {
        tokenizer.pop();

        this.targetAttributeName = AtrributeName.getAttributeName(tokenizer);

        let currentLine = tokenizer.getLine();
        let token = tokenizer.pop();
        if (token !== Tokens.SHOULD) {
            throw new ParserError(`Invalid Assertion key word at line ${currentLine}. Parser was expecting: [should] and received: [${token}] instead`);
        }

        token = tokenizer.pop();
        switch(token) {
            case Tokens.BE:
                this.assertionType = AssertionType.Be;
                break;
            case Tokens.CONTAIN:
                this.assertionType = AssertionType.Contain;
                break;
            case Tokens.NOT:
                token = tokenizer.pop();
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

        this.expectValue = Value.getValue(tokenizer);
    }    
    
    public async evaluate() {
        const selector: string = Node.selector;
        const page = Node.page;
        await page.$$eval(selector, Utils.checkSelector);
        let attributeVal = await page.$eval(selector, e => e.getAttribute(this.targetAttributeName));
        let containsCond = await page.$eval(selector, e => e.contains(this.expectValue));
        switch (this.assertionType) {
            case AssertionType.Be:
                this.assertionHelper(attributeVal === this.expectValue);
                break;
            case AssertionType.NotBe:
                this.assertionHelper(attributeVal !== this.expectValue);
                break;
            case AssertionType.Contain:
                this.assertionHelper(containsCond);
                break;
            case AssertionType.NotContain:
                this.assertionHelper(!containsCond);
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