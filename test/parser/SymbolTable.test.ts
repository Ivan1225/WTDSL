import * as chai from 'chai';
import {DotProgram} from '../../src/dsl/DotProgram';

import {ProgramOutputStatus} from '../../src/dsl/ProgramOutput';
import EdgeNode from "../../src/parser/EdgeNode";
import ShapeNode from "../../src/parser/ShapeNode";


const expect = chai.expect;

describe('DSL should have a symbol table', () => {

    before(() => {

    });

    it('should parse a valid input', async () => {
        let dotProgram = new DotProgram("valid/sample.tdot");
        let output = dotProgram.parse();
        expect(output.status).to.be.equal(ProgramOutputStatus.SUCCESS);

        expect(output.symbolTable.size()).to.be.equal(2);
        expect(output.symbolTable.has("Fido")).to.be.true;
        expect(output.symbolTable.has("Biff")).to.be.true;

        expect(output.symbolTable.get("Fido") instanceof ShapeNode).to.be.true;
        expect(output.symbolTable.get("Biff") instanceof ShapeNode).to.be.true;
    });

});