import Amount from "./amount"
export default class PaymentMethod {
    static WECHAT_METHOD = 1
    static APLIPAY_METHOD = 2
    static BALANCE_METHOD = 3
    static BALANCE_EXTRO_METHOD = 4
    constructor(e) {
        if(e){
            this.setConstructorParams(e)
        }
    }
    /**
     *
     * @param amount 需支付金额
     * @param balance 用户余额
     */
    setConstructorParams({ amount, balance }){
        this.amount = parseFloat(Amount.amount(amount))
        this.balance = parseFloat(Amount.amount(balance))
    }
    amount = 0
    balance = 0

    // 获得可以支付的所有支付方式
    getPaymentMethods(){
        if(this.balance >= this.amount){
            // 余额大于要支付的
            return [PaymentMethod.WECHAT_METHOD,PaymentMethod.APLIPAY_METHOD,PaymentMethod.BALANCE_METHOD]
        }else if(this.balance === 0 || this.balance === 0.00){
            // 如果没有余额
            return [PaymentMethod.WECHAT_METHOD,PaymentMethod.APLIPAY_METHOD]
        }else if(this.amount>this.balance){
            // 有余额 但是不够
            return [PaymentMethod.WECHAT_METHOD,PaymentMethod.APLIPAY_METHOD,PaymentMethod.BALANCE_EXTRO_METHOD]
        }else{
            return []
        }
    }

}
