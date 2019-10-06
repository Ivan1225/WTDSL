import Tokenizer from "../libs/Tokenizer";

export abstract class Node {

	protected static names: string[] = [];
    protected static page;
    protected static setPage(p) {
        Node.page = p;
    }
    abstract parse(tokenizer: Tokenizer);
    abstract evaluate();
}