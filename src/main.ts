import { WTProgram } from "./dsl/WTProgram";

const args = process.argv.slice(2)
const fileName = args[0];

let samplefileName = 'valid/forLoopExample.txt'
let wtProgram = new WTProgram(fileName);
wtProgram.parse();
wtProgram.evaluation()