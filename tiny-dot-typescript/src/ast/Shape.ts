export default class Shape {
    geoShape: string;

    name: string;

    constructor() {

    }

    public toDigraph() {
        let name = this.name;
        let geo = this.geoShape;
        return `${name}[shape=${geo}]\n`;
    }
}