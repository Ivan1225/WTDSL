import {Node} from "../parser/Node";
import SymbolTable from "../parser/SymbolTable";
import {ParserError} from '../errors/ParserError';

export enum ProgramOutputStatus {
    SUCCESS,
    ERROR

}

export default class ProgramOutput {

    status: ProgramOutputStatus;
    ast: Node;
    symbolTable: SymbolTable;
    errors: Error[];

    constructor(status: ProgramOutputStatus, ast: Node, symbolTable: SymbolTable, errors: Error[]) {
        this.status = status;
        this.ast = ast;
        this.symbolTable = symbolTable;
        this.errors = errors;
    }
}