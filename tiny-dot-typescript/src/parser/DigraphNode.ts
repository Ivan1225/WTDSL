import {Node} from "./Node";
import Tokenizer from "../parser/Tokenizer";
import {ParserError} from '../errors/ParserError';
import Tokens from "./Tokens";
import ShapeNode from "./ShapeNode";
import EdgeNode from "./EdgeNode";
import {CompileError} from "../errors/CompileError";
import {OutputWriter} from "../dsl/OutputWriter";

export default class DigraphNode extends Node {

    constructor() {
        super();
    }

    public parse(context: Tokenizer) {
        let nodes: Array<Node> = [];

        while (context.hasNext()) {
            let nextToken = context.top();
            switch (nextToken) {
                case Tokens.MAKE:
                    let shapeNode = new ShapeNode();
                    shapeNode.parse(context);
                    nodes.push(shapeNode);
                    break;
                case Tokens.CONNECT:
                    let edgeNode = new EdgeNode();
                    edgeNode.parse(context);
                    nodes.push(edgeNode);
                    break;
                default:
                    throw new ParserError("Unrecognizable token: ${nextToken}");
            }
        }

        let shapes = nodes.filter(n => n instanceof ShapeNode);
        let edges = nodes.filter(n => n instanceof EdgeNode);

        this.children = this.children.concat(shapes);
        this.children = this.children.concat(edges);
    }


    public compile() {
        try {
            let file = this.target;
            let writer = OutputWriter.getInstance(file, 'utf-8');

            writer.write("digraph G {\n");
            this.children.forEach((node) => {
                node.compile()
            });
            writer.write("}");
            writer.flush();
        } catch (err) {
            throw new CompileError(err.message);
        }
    }

    public root(): Node {
        return this;
    }

}