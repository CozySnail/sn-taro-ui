/**
 * 微信工具类
 * @Author snail
 */

/**
 * @Description: 微信配置
 * @author snail
 * @date 2019-02-26
 * @param url {string} 需要配置的页面地址
 * @param jsApiList {Array} 需要配置的页面需要使用的api接口集合
 */
declare function config(url: string, jsApiList: Array<string>): void;

/**
 * @Description: 同时配置分享到朋友圈和分享好友
 * @author snail
 * @date 2019-03-21
 * @param shareTitle {string} 分享标题
 * @param shareDesc {string} 分享描述
 * @param shareLink {string} 分享链接
 * @param shareIcon {string} 分享图标
 */
declare function share(shareTitle: string, shareDesc: string, shareLink: string, shareIcon: string): void;

/**
 * @Description: 隐藏微信右上角弹出菜单中部分功能按钮
 * @author snail
 * @date 2019-02-26
 * @param menuList {Array} 需要隐藏的菜单集合
 * @param callback {function} 回调函数
 */
declare function hideWeChatMenuItems(menuList?: Array<string>, callback?: Function): void;

/**
 * @Description: 分享到朋友圈
 * @author snail
 * @date 2019-02-26
 * @param title {string} 分享标题
 * @param link {string} 分享链接
 * @param imgUrl {string} 分享图标
 * @param callback 回调函数
 */
declare function weChatShareTimeline(title: string, link: string, imgUrl: string, callback?: Function): void;

/**
 * @Description: 分享好友
 * @author snail
 * @date 2019-02-26
 * @param title {string} 分享标题
 * @param desc {string}  分享描述信息
 * @param link {string} 分享链接
 * @param imgUrl {string} 分享图标
 * @param callback 回调函数
 */
declare function weChatShareAppMessage(title: string, desc: string, link: string, imgUrl: string, callback?: Function): void;

declare const SnWeChatUtil: {
  config: typeof config;
  share: typeof share;
  hideWeChatMenuItems: typeof hideWeChatMenuItems;
  weChatShareTimeline: typeof weChatShareTimeline;
  weChatShareAppMessage: typeof weChatShareAppMessage;
};
export default SnWeChatUtil;
