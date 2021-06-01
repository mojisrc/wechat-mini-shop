export default class Price {
    static short(num) {
        return num > 9999 ? (Math.floor(num/1000)/10) + '万' : num
    }
}
