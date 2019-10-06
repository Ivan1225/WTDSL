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

    public static trimBrackets(token: string) {
        let length = token.length;
        return token.slice(1, length - 1);
    }


}