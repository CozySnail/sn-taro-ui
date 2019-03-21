import SnCheckEnv from '../SnCheckEnv';

const PAY_CENTER_API_ROOT = SnCheckEnv.isDev() ? 'https://payuat.p6air.com/JZPay' : 'https://payuat.p6air.com/JZPay';
const Urls = {
  //支付中心接口
  GET_LOGIN_INFO_API: PAY_CENTER_API_ROOT + '/api/weChat/get-mp-openId',//不需要签名
  DECRYPT_WX_MP_DATA_API: PAY_CENTER_API_ROOT + '/api/weChat/author/decrypt-mp-data',//需要签名
  SAVE_WX_MP_USER_INFO_API: PAY_CENTER_API_ROOT + '/api/weChat/author/save-mp-user-info',//需要签名
  GET_SESSION_ID_API: PAY_CENTER_API_ROOT + '/api/system/get-session-id',//不需要签名
  MP_APPLY_PAY_API: PAY_CENTER_API_ROOT + '/api/paycenter/wechat/author/apply-wechat-pay',//需要签名
  GET_CHECK_CODE_IMG_API: PAY_CENTER_API_ROOT + '/servlet/validateCodeServlet',//不需要签名
  GET_MOBILE_CODE_API: PAY_CENTER_API_ROOT + '/api/sms/author/get-sms-code',//获取手机验证码,不需要图形验证码, 需要签名
  CHECK_MOBILE_CODE_API: PAY_CENTER_API_ROOT + '/api/sms/author/verify-sms-code',//需要签名
  GET_USER_INFO_API: PAY_CENTER_API_ROOT + '/api/users/author/get-mp-user-info',//需要签名
  UPDATE_MOBILE: PAY_CENTER_API_ROOT + '/api/users/author/update-mobile',//需要签名
  UPDATE_USER_INFO: PAY_CENTER_API_ROOT + '/api/users/author/save-mp-user-info',//需要签名
  GET_SMS_VERIFY_CODE: PAY_CENTER_API_ROOT + '/api/sms/author/get-sms-verify-code',//需要签名
  MOBILE_LOGIN_API: PAY_CENTER_API_ROOT + '/api/users/author/mobile-login',//手机号码登录
  GET_OPEN_ID_BY_WE_CHAT_CODE_API: PAY_CENTER_API_ROOT + '/api/weChat/get-wechat-openId',   //根据微信授权code获取用户openId
  GET_WE_CHAT_CONFIG_API: PAY_CENTER_API_ROOT + '/api/paycenter/wechat/gen-wechat-config',   //生产微信配置信息
  OCR_CARD: PAY_CENTER_API_ROOT + '/api/ocr/generalIdentifyCard',  //社保卡识别
};
export default Urls;
