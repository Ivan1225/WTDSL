import Tokenizer from "../libs/Tokenizer";

export abstract class Node {
    abstract parse(tokenizer: Tokenizer);
    abstract evaluate();
}