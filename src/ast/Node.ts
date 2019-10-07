import Tokenizer from "../libs/Tokenizer";

export abstract class Node {

	public static nameTable: {[key: string]: any} = {};
	public static selector;
    public static page;
    public static withinPrefixes: string[] = [];
    protected static testResult: {[key: string]: number} = {
        total: 0,
        pass: 0,
        fail: 0,
    }
    protected static testPass() {
        Node.testResult.total += 1;
        Node.testResult.pass += 1;
		console.log('passed test');
    }
    protected static testFail() {
        Node.testResult.total += 1;
        Node.testResult.fail += 1;
		console.log('failed test');
    }
    protected static printResult() {
        let pass : number = Node.testResult.pass;
        let fail : number = Node.testResult.fail;
        let total : number = Node.testResult.total
        console.log(`Ran ${total} test(s) in total; ${pass} test(s) passed; ${fail} test(s) failed`);
    }
    protected static setPage(p) {
        Node.page = p;
    }
	protected static setSelector(s) {
        Node.selector = s;
    }

    protected static addWithinPrefix(prefix: string) {
        Node.withinPrefixes.push(prefix);
    }
    protected static removeWithinPrefix() {
        Node.withinPrefixes.pop();
    }
    abstract parse(tokenizer: Tokenizer);
    abstract evaluate();
}