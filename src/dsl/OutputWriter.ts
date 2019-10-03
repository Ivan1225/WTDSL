import * as fs from "fs";

export class OutputWriter {
    private static instance: OutputWriter;
    private file: string;
    private encoding: string;
    private out: Array<string>;


    private constructor(file: string, encoding: string) {
        this.file = file;
        this.encoding = encoding;
        this.out = [];


    }

    public static getInstance(file: string, encoding: string) {
        if (OutputWriter.instance == null) {
            OutputWriter.instance = new OutputWriter(file, encoding);

        }
        return OutputWriter.instance;
    }

    public static getWriter(): OutputWriter {
        return OutputWriter.instance;
    }

    public write(input: string) {
        this.out.push(input);
    }


    public flush() {
        fs.writeFileSync(this.file, this.out.join("\n"), {encoding: this.encoding, flag: 'w'});
        console.log("done");

    }

    public static tearDown() {
        OutputWriter.instance.out = [];
        OutputWriter.instance = null;
    }
}

