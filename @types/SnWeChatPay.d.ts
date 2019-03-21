/**
 * 微信支付工具类
 * @Author snail
 */
/**
 * @Description: 发起支付
 * @author snail
 * @date 2019-03-19
 */
declare function applyPay(): void;

declare const SnWeChatPay: {
  applyPay: typeof applyPay;
};
export default SnWeChatPay;
