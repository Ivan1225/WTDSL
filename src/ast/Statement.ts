import { Node } from './Node';
import Tokenizer from "../libs/Tokenizer";
import Tokens from '../libs/Tokens';
import { ParserError } from '../errors/ParserError';

export default abstract class Statement extends Node {

    public static getSubStatement(tokenizer: Tokenizer): Statement {
        switch(tokenizer.top()) {
            case Tokens.VISIT:
                return null;
            case Tokens.SELECT:
                return null;
            case Tokens.CLICK:
                return null;
            case Tokens.WAIT:
                return null;
            case Tokens.FILL:
                return null;
            case Tokens.EXPECT:
                return null;
            case Tokens.VALUE:
                return null;
            case Tokens.WITHIN:
                return null;
            default:
                throw new ParserError("Unrecognizable token: ${nextToken}");
        }
    }

}