import { WTProgram, ProgramStatus } from "./dsl/WTProgram";

const args = process.argv.slice(2)
const fileName = args[0];

let samplefileName = 'valid/forLoopExample.txt'
let wtProgram = new WTProgram(fileName);
let status = wtProgram.parse();
if(status == ProgramStatus.PARSERSUCCESS) {
    wtProgram.evaluation();
}
