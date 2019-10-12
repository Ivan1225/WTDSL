import { Node } from './Node';
import Tokenizer from "../libs/Tokenizer";
import Tokens from '../libs/Tokens';
import { ParserError } from '../errors/ParserError';
import Visit from './Visit';
import Within from './Within';
import Select from './Select';
import Wait from './wait';
import Click from './Click';
import Assertion from './Assertion';
import Fill from './Fill';
import Loop from './Loop';
import ValDef from './VALDEF';

export default abstract class Statement extends Node {

    public static getSubStatement(tokenizer: Tokenizer) {
        let nextToken = tokenizer.top();
        let currentLine = tokenizer.getLine();
        switch(nextToken) {
            case Tokens.VISIT:
                return new Visit();
            case Tokens.SELECT:
                return new Select();
            case Tokens.CLICK:
                return new Click();
            case Tokens.WAIT:
                return new Wait();
            case Tokens.FILL:
                return new Fill();
            case Tokens.EXPECT:
                return new Assertion();
            case Tokens.VALUE:
                return new ValDef();
            case Tokens.WITHIN:
                return new Within();
            case Tokens.FOR:
                return new Loop();
            default:
                throw new ParserError(`Unrecognizable token: ${nextToken} at line ${currentLine}`);
        }
    }

}