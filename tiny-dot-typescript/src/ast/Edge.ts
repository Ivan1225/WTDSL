export default class Edge {
    a: string;

    b: string;

    constructor() {

    }

    public connect(token: string) {
        if (this.a == null) {
            this.a = token;
        } else {
            this.b = token;
        }
    }

    public toDigraph(): string {
        let a = this.a;
        let b = this.b;
        return `${a}->${b}\n`;
    }
}