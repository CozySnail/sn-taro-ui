/**
 * 微信支付工具类
 * @Author snail
 */
/**
 * @Description: 发起 h5 微信支付
 * @author snail
 * @date 2019-02-26
 * @param weChatConfigId {string}   商品名称及描述
 * @param productDesc {string}   商品名称及描述
 * @param orderNum {string}      订单号
 * @param price {number}         订单金额
 * @param notifyUrl {string}     支付回调地址
 * @param attach {string}        附加数据
 * @param successUrl {string}    支付成功跳转地址
 * @param failureUrl {string}    支付失败跳转地址
 * @param callback {function}      回调函数
 */
declare function applyPayH5(weChatConfigId: string, productDesc: string, orderNum: string, price: number, notifyUrl: string, attach: string, successUrl: string, failureUrl: string, callback: Function): void;

/**
 * @Description: 发起 小程序 微信支付
 * @author snail
 * @date 2019-02-26
 * @param weChatConfigId {string}   商品名称及描述
 * @param productDesc {string}   商品名称及描述
 * @param orderNum {string}      订单号
 * @param price {number}         订单金额
 * @param notifyUrl {string}     支付回调地址
 * @param attach {string}        附加数据
 * @param successUrl {string}    支付成功跳转地址
 * @param failureUrl {string}    支付失败跳转地址
 * @param callback {function}      回调函数
 */
declare function applyPayMP(weChatConfigId: string, productDesc: string, orderNum: string, price: number, notifyUrl: string, attach: string, successUrl: string, failureUrl: string, callback: Function): void

declare const SnWeChatPay: {
  applyPayH5: typeof applyPayH5;
  applyPayMP: typeof applyPayMP;
};
export default SnWeChatPay;
