import ProgramOutput from './ProgramOutput';

export default interface IProgram {

    parse(): ProgramOutput;

    compile(): ProgramOutput;

}