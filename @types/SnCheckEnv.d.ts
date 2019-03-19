/**
 * 判断 Taro 运行环境工具类
 * @Author snail
 */

/**
 * @Description: 判断是否为 Web 或 H5 环境
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isWeb(): boolean;

/**
 * @Description: 判断是否为微信小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isWeApp(): boolean;

/**
 * @Description: 判断是否为ReactNative
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isRN(): boolean;

/**
 * @Description: 判断是否为百度小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isSwan(): boolean;

/**
 * @Description: 判断是否为支付宝小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isAlipay(): boolean;

/**
 * @Description: 判断是否为字节跳动小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isTT(): boolean;

/**
 * @Description: 判断是否为微信公众号
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isWeChatPublic(): boolean;

/**
 * @Description: 判断是否为微信小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isWeChatMiniProgram(): boolean;

/**
 * @Description: 判断是否为 PC 环境
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
declare function isPC(): boolean;

declare const SnCheckEnv: {
  isWeb: typeof isWeb;
  isH5: typeof isWeb;
  isWeApp: typeof isWeApp;
  isRN: typeof isRN;
  isSwan: typeof isSwan;
  isAlipay: typeof isAlipay;
  isTT: typeof isTT;
  isWeChatPublic: typeof isWeChatPublic;
  isWeChatMiniProgram: typeof isWeChatMiniProgram;
  isPC: typeof isPC;
};
export default SnCheckEnv;
