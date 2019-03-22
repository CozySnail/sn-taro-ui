/**
 * 微信支付工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import wx from 'weixin-js-sdk';
import Request from '../../network/SnRequest';
import Result from '../../network/Result';
import SnCheckEnv from '../../SnCheckEnv';
import storage from '../../SnStorage';
import Urls from '../../network/SnUrls';

const OPEN_ID = storage.get('openId');
const PLATFORM_TYPE = 'payCenter';

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
function applyPayH5(weChatConfigId: string,
                    productDesc: string,
                    orderNum: string,
                    price: number,
                    notifyUrl: string,
                    attach: string = '',
                    successUrl: string,
                    failureUrl: string,
                    callback: Function) {
  let isWeChat = SnCheckEnv.isWeChatPublic() || SnCheckEnv.isWeApp();
  let successRedirectUrl = encodeURIComponent(successUrl);
  let failureRedirectUrl = encodeURIComponent(failureUrl);

  genApplyPayParams({
    weChatConfigId: weChatConfigId,
    productDesc: productDesc,
    orderNum: orderNum,
    price: price,
    notifyUrl: notifyUrl,
    attach: attach,
    success: (applyPayData) => {
      console.log('微信预支付返回结果 applyPayData : ', applyPayData);
      let success = applyPayData.success;
      if (success) {
        let data = applyPayData.data;
        if (isWeChat) {
          // 配置完以后才能在此方法中调起微信支付的弹窗
          wx.ready(function () {
            //就绪后的处理
            wx.chooseWXPay({
              timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: "prepay_id=" + data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: function (res) {
                console.log('调起微信支付结果 : ', res);
                if (successUrl !== null && successUrl !== "") {
                  Taro.redirectTo({url: successUrl}).then();
                } else {
                  console.log('支付成功, 尚未配置成功跳转页面');
                }
              },
              Error: function (err) {
                if (failureUrl !== null && failureUrl !== "") {
                  Taro.navigateTo({url: failureUrl}).then();
                } else {
                  console.log("支付失败, 错误信息:", err);
                }
              },
              cancel: function (res) {
                Result.sendCallback(res, callback);
              },
              fail: function (res) {
                Result.sendCallback(res, callback);
              }
            });
          });
        } else {
          Taro.navigateTo({url: data.mwebUrl + "&redirect_url=" + successRedirectUrl}).then();
        }
      } else {
        if (isWeChat) {
        } else {
          Taro.navigateTo({url: failureRedirectUrl}).then();
        }
      }
    }
  });
}

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
function applyPayMP(weChatConfigId: string, productDesc: string, orderNum: string, price: number, notifyUrl: string, attach: string = '', successUrl: string, failureUrl: string, callback: Function) {
  let isWeChat = SnCheckEnv.isWeChatPublic() || SnCheckEnv.isWeApp();

  genApplyPayParams({
    weChatConfigId: weChatConfigId,
    productDesc: productDesc,
    orderNum: orderNum,
    price: price,
    notifyUrl: notifyUrl,
    attach: attach,
    success: (applyPayData) => {
      console.log('微信预支付返回结果 applyPayData : ', applyPayData);
      let success = applyPayData.success;
      let msg = applyPayData.msg;
      if (success) {
        let data = applyPayData.data;
        if (isWeChat) {
          Taro.requestPayment({
            timeStamp: data.timestamp,  // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
            package: "prepay_id=" + data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.paySign, // 支付签名
            success: function (res) {
              console.log('调起微信支付结果 : ', res);
              if (successUrl !== null && successUrl !== "") {
                Taro.redirectTo({url: successUrl}).then();
              } else {
                console.log('支付成功, 尚未配置成功跳转页面');
              }
            },
            fail: function (err) {
              if (failureUrl !== null && failureUrl !== "") {
                Taro.navigateTo({url: failureUrl}).then();
              } else {
                console.log("支付失败, 错误信息:", err);
              }
            }
          }).then();
        }
      } else {
        if (failureUrl !== null && failureUrl !== "") {
          Taro.navigateTo({url: failureUrl}).then();
        } else {
          console.log("支付失败, 错误信息:", msg);
          Result.sendCallback(applyPayData, callback);
        }
      }
    }
  });
}

/**
 * @Description: 调用后台接口生成微信预支付需要的参数, 供调起微信支付使用
 * @author snail
 * @date 2019-03-22
 * @param parameters
 *  weChatConfigId {string}   商品名称及描述
 *  productDesc {string}   商品名称及描述
 *  orderNum {string}      订单号
 *  price {number}         订单金额
 *  notifyUrl {string}     支付回调地址
 *  attach {string}        附加数据
 *  callback {function}      回调函数
 */
function genApplyPayParams(parameters: { weChatConfigId: string, productDesc: string, orderNum: string, price: number, notifyUrl: string, attach: string, success: Function }) {
  let {weChatConfigId, productDesc, orderNum, price, notifyUrl, attach, success} = parameters;
  let applyPayData = {};
  let isWeChat = SnCheckEnv.isWeChatPublic() || SnCheckEnv.isWeApp();
  let tradeType = isWeChat ? 'JSAPI' : 'MWEB';
  let applyPayDataParams = {
    weChatConfigId,
    productDesc,
    orderNum,
    price,
    notifyUrl,
    tradeType,
    attach,
    openId: OPEN_ID
  };
  console.log('微信预支付需要的参数 applyPayDataParams : ', applyPayDataParams);

  // 声明用于接收发起支付请求后的返回结果
  let timestamp = '';
  let nonceStr = '';
  let prepayId = '';
  let signType = '';
  let paySign = '';
  let mwebUrl = '';

  Request.postJson(Urls.GET_WE_CHAT_CONFIG_API, applyPayDataParams, PLATFORM_TYPE, true, false, '', (applyPayRes) => {
      let applySuccess = applyPayRes.success;
      let payResultData = applyPayRes.data;
      let msg = applyPayRes.msg;
      if (applySuccess) {
        console.log('微信预支付返回结果 payResultData : ', msg, payResultData);

        // 声明用于接收发起支付请求后的返回结果
        timestamp = payResultData.timeStamp;
        nonceStr = payResultData.nonceStr;
        prepayId = payResultData.prepayId;
        signType = payResultData.signType;
        paySign = payResultData.paySign;
        mwebUrl = isWeChat ? '' : payResultData.mwebUrl;

        applyPayData['success'] = applySuccess;
        applyPayData['data'] = {applySuccess, timestamp, nonceStr, prepayId, signType, paySign, mwebUrl};
        applyPayData['msg'] = msg;
        Result.sendCallback(applyPayData, success);
      } else {
        applyPayData['success'] = applySuccess;
        applyPayData['data'] = null;
        applyPayData['msg'] = msg;
        Result.sendCallback(applyPayData, success);
      }
    },
    (applyPayRes) => {
      let applySuccess = applyPayRes.success;
      let msg = applyPayRes.msg;
      console.log('获取微信配置信息错误 : ', msg);

      applyPayData['success'] = applySuccess;
      applyPayData['data'] = null;
      applyPayData['msg'] = msg;
      Result.sendCallback(applyPayData, success);
    });
}

export default {
  applyPayH5,
  applyPayMP,
};
