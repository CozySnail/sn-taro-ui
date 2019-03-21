/**
 * 支付宝支付工具类
 * @Author snail
 */
/**
 * @Description: 发起支付, 模拟form表单提交
 * @author snail
 * @date 2019-03-19
 * @param aliConfigId {string}     // 支付宝ID
 * @param productDesc {string}     // 商品描述
 * @param orderNum {string}        // 订单号
 * @param price {number}            // 订单总金额
 * @param notifyUrl {string}       // 支付回调地址
 * @param passbackParams {any}  // 公用回传参数, 如果请求时传递了该参数，则返回给商户时会回传该参数。支付宝会在异步通知时将该参数原样返回。本参数必须进行UrlEncode之后才可以发送给支付宝
 * @param successUrl {string}     // 支付成功后的调整地址
 */
declare function applyPayH5(aliConfigId: string, productDesc: string, orderNum: string, price: number, passbackParams: any, successUrl: string, notifyUrl: string): void;

declare const SnAlipay: {
  applyPayH5: typeof applyPayH5;
};
export default SnAlipay;
