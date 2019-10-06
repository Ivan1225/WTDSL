import Tokenizer from "../libs/Tokenizer";

export abstract class Node {

	protected static names: string[] = [];
	public static selector;
    public static page;
    protected static setPage(p) {
        Node.page = p;
    }
	protected static setSelector(s) {
        Node.selector = s;
    }
    abstract parse(tokenizer: Tokenizer);
    abstract evaluate();
}