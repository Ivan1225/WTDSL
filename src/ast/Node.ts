import Tokenizer from "../libs/Tokenizer";
import * as fs from 'fs';
import * as path from 'path';

export abstract class Node {

	public static nameTable: {[key: string]: any} = {};
	public static selector;
    public static page;
    public static withinPrefixes: string[] = [];
    public static output: string[] = []
    protected static testStats: {[key: string]: number} = {
        total: 0,
        pass: 0,
        fail: 0,
    }
    protected static failedTests: number[] = [];
    protected static testPass() {
        Node.testStats.total += 1;
        Node.testStats.pass += 1;
        console.log('passed test');
        Node.output.push('passed test')
    }
    protected static testFail() {
        Node.testStats.total += 1;
        Node.testStats.fail += 1;
        Node.failedTests.push(Node.testStats.total);
        console.log('failed test');
        Node.output.push('failed test')
    }

    protected static printOutput(str: string) {
        console.log(str);
        Node.output.push(str);
    }

    protected static printResult() {
        let pass : number = Node.testStats.pass;
        let fail : number = Node.testStats.fail;
        let total : number = Node.testStats.total
        let failedArr = Node.failedTests;
        let testStatsSummary = `Ran ${total} test(s) in total; ${pass} test(s) passed; ${fail} test(s) failed`;
        let failedTestsSummary = `Failed tests are: test ${failedArr.reduce((acc, curr) => `${curr}${acc ? `, ${acc}` : acc}`, '')}`
        let output = Node.output.concat([testStatsSummary]);
        if (Node.failedTests.length > 0) {
            output.push(failedTestsSummary);
        }
        let date = new Date();
        fs.writeFileSync(path.join(__dirname, "../../resources/output/testResult.txt"), `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}\n`)
        output.map(data => {
            console.log(data);
            fs.appendFileSync(path.join(__dirname, "../../resources/output/testResult.txt"), `${data}\n`);
        });
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