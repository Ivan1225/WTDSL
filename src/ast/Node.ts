import Tokenizer from "../libs/Tokenizer";

export abstract class Node {
    static tokenizer: Tokenizer = Tokenizer.getTokenizer();

    abstract parse();
    abstract evaluate();
}