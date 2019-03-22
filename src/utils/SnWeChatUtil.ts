/**
 * 微信工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {StringUtil} from 'sn-js-utils';
import wx from 'weixin-js-sdk';
import SnCheckEnv from './SnCheckEnv';
import Request from './network/SnRequest';
import Result from './network/Result';
import Urls from './network/SnUrls';
import storage from './SnStorage';

const PLATFORM_TYPE = 'payCenter';
const CHANNEL = storage.get('channel');
const DEFAULT_CONFIG_API = ['chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage'];
const HIDE_MENU = ['menuItem:share:qq', 'menuItem:share:QZone', 'menuItem:share:weiboApp', 'menuItem:copyUrl'];

/**
 * @Description: 微信配置
 * @author snail
 * @date 2019-02-26
 * @param url {string} 需要配置的页面地址, 一般 H5 获取此地址需要使用 location.href.split('#')[0]
 * @param jsApiList {Array} 需要配置的页面需要使用的api接口集合
 */
function config(url: string, jsApiList: Array<string> = DEFAULT_CONFIG_API): void {
  let isWeChat = SnCheckEnv.isWeChatPublic() || SnCheckEnv.isWeApp();
  console.log('是否在微信中打开的 : ', isWeChat);
  if (isWeChat && StringUtil.isNotEmpty(url)) {
    let genConfigParams = {
      weChatConfigId: process.env.WE_CHAT_INNER_ID,
      targetUrl: url
    };

    Request.postForm(Urls.GET_WE_CHAT_CONFIG_API, genConfigParams, PLATFORM_TYPE, false, '', (applyPayRes) => {
        if (applyPayRes.success) {
          let wxConfigData = applyPayRes.data;
          let msg = applyPayRes.msg;

          let timestamp = wxConfigData.timestamp;
          let nonceStr = wxConfigData.nonceStr;
          let signature = wxConfigData.signature;
          let appId = wxConfigData.appId;
          let configData = {
            debug: false, // 开启调试模式
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList
          };
          console.log('configData : ', wxConfigData, msg);
          wx.config(configData);
        }
      },
      (applyPayRes) => {
        let msg = applyPayRes.msg;
        console.log('获取微信配置信息错误 : ', msg);
      });
  }
}

/**
 * @Description: 同时配置分享到朋友圈和分享好友
 * @author snail
 * @date 2019-03-21
 * @param shareTitle {string} 分享标题
 * @param shareDesc {string} 分享描述
 * @param shareLink {string} 分享链接
 * @param shareIcon {string} 分享图标
 */
function share(shareTitle: string = '分享标题', shareDesc: string = '分享描述', shareLink: string = '分享链接', shareIcon: string = '分享图标'): void {
  hideWeChatMenuItems(HIDE_MENU);
  weChatShareTimeline(shareTitle, shareLink, shareIcon);
  weChatShareAppMessage(shareTitle, shareDesc, shareLink, shareIcon);
}

/**
 * @Description: 隐藏微信右上角弹出菜单中部分功能按钮
 * @author snail
 * @date 2019-02-26
 * @param menuList {Array} 需要隐藏的菜单集合
 * @param callback {function} 回调函数
 */
function hideWeChatMenuItems(menuList?: Array<string>, callback?: Function): void {
  wx.hideMenuItems({
    menuList, // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录4
    success: function (res) {
      Result.sendCallback(res, callback);
    }
  });
}

/**
 * @Description: 分享到朋友圈
 * @author snail
 * @date 2019-02-26
 * @param title {string} 分享标题
 * @param link {string} 分享链接
 * @param imgUrl {string} 分享图标
 * @param callback 回调函数
 */
function weChatShareTimeline(title: string = '分享标题', link: string = '分享链接', imgUrl: string = '分享图标', callback?: Function): void {
  let shareFlag = StringUtil.isNotEmpty(CHANNEL) ? 'channel=' + CHANNEL : '';
  link = link + StringUtil.contains(link, '?') ? ('&' + shareFlag) : ('?' + shareFlag);
  let ret = {};
  wx.ready(function () {
    wx.onMenuShareTimeline({
      // 分享标题
      title,
      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      link,
      // 分享图标
      imgUrl,
      // 用户确认分享后执行的回调函数
      success: function () {
        console.log('分享回调函数');
        console.log('shareLink= ' + link);

        ret = {success: true, type: '1', msg: '分享成功'};
        Result.sendCallback(ret, callback);
      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('取消分享回调函数');
        // alert('取消分享回调函数');
        ret = {success: false, type: '2', msg: '取消分享'};
        Result.sendCallback(ret, callback);
      },
      fail: function (res) {
        ret = {success: false, type: '3', msg: res};
        Result.sendCallback(ret, callback);
      }
    });
  });
}

/**
 * @Description: 分享好友
 * @author snail
 * @date 2019-02-26
 * @param title {string} 分享标题
 * @param desc {string}  分享描述信息
 * @param link {string} 分享链接
 * @param imgUrl {string} 分享图标
 * @param callback 回调函数
 *
 */
function weChatShareAppMessage(title: string = '分享标题', desc: string = '分享描述', link: string = '分享链接', imgUrl: string = '分享图标', callback?: Function): void {
  let shareFlag = StringUtil.isNotEmpty(CHANNEL) ? 'channel=' + CHANNEL : '';
  link = link + StringUtil.contains(link, '?') ? ('&' + shareFlag) : ('?' + shareFlag);
  let ret = {};
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      // 分享标题
      title,
      // 分享描述
      desc,
      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      link,
      // 分享图标
      imgUrl,
      // 用户确认分享后执行的回调函数
      success: function () {
        console.log('分享回调函数');
        console.log('shareLink= ' + link);

        ret = {success: true, type: '1', msg: '分享成功'};
        Result.sendCallback(ret, callback);
      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('取消分享回调函数');
        // alert('取消分享回调函数');
        ret = {success: false, type: '2', msg: '取消分享'};
        Result.sendCallback(ret, callback);
      },
      fail: function (res) {
        ret = {success: false, type: '3', msg: res};
        Result.sendCallback(ret, callback);
      }
    });
  });
}

function shareForMP() {
  Taro.showShareMenu({withShareTicket: true}).then();
  Taro.hideShareMenu({withShareTicket: true}).then();
}
export default {
  config,
  share,
  hideWeChatMenuItems,
  weChatShareTimeline,
  weChatShareAppMessage,
  shareForMP
};
