import {Node} from "../parser/Node";


export interface IEventListener {

    update(event: string, currentValue: Node, lastValue: Node);
}

export default class AstVisitor {

    root: Node;
    lastVisited: Node;
    listeners: Array<IEventListener>;

    constructor(root: Node) {
        this.root = root;
        this.lastVisited = null;
        this.listeners = [];
    }


    public traverse() {
        this.visit(this.root);
    }

    public visit(node: Node) {
        this.listeners.forEach(
            (l) => {
                l.update("node", node, this.lastVisited);
            }
        );
        this.lastVisited = node;
        this.visitChildren(node);
    }

    private visitChildren(node: Node) {
        if (node.getChildren() !== null) {
            for (let child of node.getChildren()) {
                this.visit(child);
            }
        }
    }

    addListener(listener: IEventListener) {
        this.listeners.push(listener);
    }
}