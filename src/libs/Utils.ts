export default class Utils {

    public static trimQuotationMark(token: string) {
        let length = token.length;
        return token.slice(1, length - 1);
    }

    public static trimbeginQuotationMark(token: string) {
        let length = token.length;
        return token.slice(1, length);
    }

    public static trimEndQuotationMark(token: string) {
        let length = token.length;
        return token.slice(0, length - 1);
    }

    public static trimCurlyBraces(token: string) {
        let length = token.length;
        return token.slice(1, length - 1);
    }

    public static checkSelector(nodes) {
        if(nodes.length === 1) {
            return nodes[0];
        } else if(nodes.length === 0) {
            throw 'Your selector did not match anything';
        } else {
            throw 'Your selector is too general and matches ' + nodes.length + ' items';
        }
    }

}