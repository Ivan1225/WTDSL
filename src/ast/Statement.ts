import { Node } from './Node';
import Tokenizer from "../libs/Tokenizer";
import Tokens from '../libs/Tokens';
import { ParserError } from '../errors/ParserError';
import Visit from './Visit';
import Name from './Name';
import Within from './Within';
import Select from './Select';
import Wait from './wait';

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
                return null;
            case Tokens.WAIT:
                return new Wait();
            case Tokens.FILL:
                return null;
            case Tokens.EXPECT:
                return null;
            case Tokens.VALUE:
                return new Name();
            case Tokens.WITHIN:
                return new Within();
            default:
                throw new ParserError(`Unrecognizable token: ${nextToken} at line ${currentLine}`);
        }
    }

}