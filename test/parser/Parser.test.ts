import * as chai from 'chai';
import { WTProgram, ProgramStatus } from "../../src/dsl/WTProgram";

const expect = chai.expect;

describe('DSL should be able to parse', () => {

    before(() => {

    });

    it('should parse a valid input', async () => {
        let wtProgram = new WTProgram("valid/example.txt");
        let output = wtProgram.parse();
        expect(output).to.be.equal(ProgramStatus.PARSERSUCCESS);
    });

    it('should parse a valid input with varaible', async () => {
        let wtProgram = new WTProgram("valid/variableExample.txt");
        let output = wtProgram.parse();
        expect(output).to.be.equal(ProgramStatus.PARSERSUCCESS);
    });

    it('should parse a valid input with forloop', async () => {
        let wtProgram = new WTProgram("valid/forLoopExample.txt");
        let output = wtProgram.parse();
        expect(output).to.be.equal(ProgramStatus.PARSERSUCCESS);
    });
});