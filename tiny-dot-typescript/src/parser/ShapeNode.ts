import {Node} from "./Node";
import Tokenizer from "../parser/Tokenizer";
import {ParserError} from '../errors/ParserError';
import Tokens from "./Tokens";
import Shape from "../ast/Shape";
import Edge from "../ast/Edge";
import {OutputWriter} from "../dsl/OutputWriter";

export default class DigraphNode extends Node {

    expression: string[] = [Tokens.MAKE, Tokens.ME, Tokens.A, Tokens.SHAPE, Tokens.CALLED, Tokens.IDENTIFIER, Tokens.PLEASE];

    shape: Shape;

    constructor() {
        super();
        this.shape = new Shape();
    }

    public parse(context: Tokenizer) {
        let currentLine = context.getLine();
        for (let exp of this.expression) {
            let token = context.pop();
            if (token === null) {
                throw new ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (!token.match(exp)) {
                throw new ParserError("Invalid token at line ${currentLine}. Parser was expecting: [${exp}] and received: [${token}] instead");
            }
            if (token.match(Tokens.SHAPE)) {
                this.shape.geoShape = token;
            }
            if (exp == Tokens.IDENTIFIER && token.match(Tokens.IDENTIFIER)) {
                this.shape.name = token;
            }
        }
    }

    public compile() {
        let writer = OutputWriter.getWriter();
        writer.write(this.shape.toDigraph());
    }
}