/**
 * 判断 Taro 运行环境工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {StringUtil} from 'sn-js-utils';
import wx from 'weixin-js-sdk';

/**
 * @Description: 判断是否为 Web 或 H5 环境
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isWeb(): boolean {
  return StringUtil.equals(Taro.getEnv(), Taro.ENV_TYPE.WEB);
}

/**
 * @Description: 判断是否为微信小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isWeApp(): boolean {
  return StringUtil.equals(Taro.getEnv(), Taro.ENV_TYPE.WEAPP);
}

/**
 * @Description: 判断是否为ReactNative
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isRN(): boolean {
  return StringUtil.equals(Taro.getEnv(), Taro.ENV_TYPE.RN);
}

/**
 * @Description: 判断是否为百度小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isSwan(): boolean {
  return StringUtil.equals(Taro.getEnv(), Taro.ENV_TYPE.SWAN);
}

/**
 * @Description: 判断是否为支付宝小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isAlipay(): boolean {
  return StringUtil.equals(Taro.getEnv(), Taro.ENV_TYPE.ALIPAY);
}

/**
 * @Description: 判断是否为字节跳动小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isTT(): boolean {
  return StringUtil.equals(Taro.getEnv(), Taro.ENV_TYPE.TT);
}

/**
 * @Description: 判断是否为微信公众号
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isWeChatPublic(): boolean {
  let result = false;
  wx.miniProgram.getEnv(function (res) {
    const isMiniProgram = res.miniprogram;
    result = !isMiniProgram;
  });
  console.log('isWeChatPublic : ', result);
  return result;
}

/**
 * @Description: 判断是否为微信小程序
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
 */
function isWeChatMiniProgram(): boolean {
  let isMiniProgram = false;
  wx.miniProgram.getEnv(function (res) {
    isMiniProgram = res.miniprogram;
  });
  console.log('isMiniProgram : ', isMiniProgram);
  return isMiniProgram;
}

/**
 * @Description: 判断是否为 PC 环境
 * @author snail
 * @date 2019-03-19
 * @return {boolean} 返回判断结果 是/否
*/
function isPC(): boolean {
  //平台、设备和操作系统
  let system = {
    win: false,
    mac: false,
    xll: false
  };
  //检测平台
  let p = navigator.platform;
  system.win = p.indexOf("Win") === 0;
  system.mac = p.indexOf("Mac") === 0;
  system.xll = (p === "X11") || (p.indexOf("Linux") === 0);
  return system.win || system.mac || system.xll;
}

export default {
  isWeb,
  isWeApp,
  isRN,
  isSwan,
  isAlipay,
  isTT,
  isWeChatPublic,
  isWeChatMiniProgram,
  isPC,
};
