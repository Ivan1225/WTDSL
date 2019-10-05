// import Tokenizer from "./Tokenizer";

export abstract class Node {

    protected target: string;

    protected children: Array<Node>;

    abstract compile();

    //TODO: Ivan: change context type to  Tokenizer
    abstract parse(context: String);

    constructor() {
        this.children = [];
    }

    public getChildren(): Array<Node> {
        return this.children;
    }

    setTargetPath(path: string) {
        this.target = path;
    }
}