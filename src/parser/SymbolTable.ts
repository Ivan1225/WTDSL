import {IEventListener} from "../ast/AstVisitor";
import ShapeNode from "./ShapeNode";
import {Node} from "./Node";

export default class SymbolTable implements IEventListener {

    table: Map<string, Node>;

    constructor() {
        this.table = new Map()
    }

    public size(): number {
        return this.table.size;
    }

    public get(key: string): Node {
        return this.table.get(key);
    }

    public has(key: string): boolean {
        return this.table.has(key);
    }

    public update(event: string, currentValue: Node, lastValue: Node) {
        if (event === "node" && currentValue instanceof ShapeNode) {
            let shapeNode = currentValue as ShapeNode;
            this.table.set(shapeNode.shape.name, currentValue);
        }
    }
}