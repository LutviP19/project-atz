export default class Utils {
    static formatItemCode(itemCode: string) {
        return itemCode.toUpperCase().replace(/[^\w\s]/gi, '').replace(/\s/g, "");
    }
}