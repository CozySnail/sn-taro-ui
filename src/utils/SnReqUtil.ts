import Request from './network/SnRequest';
import Urls from './network/SnUrls';
import SnStorage from './SnStorage';

/**
 * 获取新的 sessionId
 */
function getSessionId() {
    return new Promise(function (resolve: (sessionId: string) => void, reject) {
        Request.postForm(Urls.GET_SESSION_ID_API, null, 'payCenter', false, '', (res) => {
            if (res.success) {
                let sessionId = res.data.sessionId;
                SnStorage.save('payCenterSessionId', 'jeeplus.session.id=' + sessionId);
                resolve(sessionId);
            } else {
                reject(res);
            }
        }, (err) => {
            reject(err);
        });
    });
}

/**
 * 获取短信验证码
 * 
 * @param getSmsVerifyCodeParams 获取验证码参数
 */
function getSmsVerifyCode(getSmsVerifyCodeParams) {
    return new Promise(function (resolve: () => void, reject: (err: any) => void) {
        Request.postJson(Urls.GET_SMS_VERIFY_CODE, getSmsVerifyCodeParams, 'payCenter', true, false, '', (res) => {
            if (res.success) {
                resolve();
            } else {
                reject(res);
            }
        }, (err) => {
            reject(err);
        });
    });
}

/**
 * 验证手机号
 * 
 * @param checkPhoneCodeParams 验证参数
 */
function checkMobileCode(checkPhoneCodeParams) {
    return new Promise(function (resolve: () => void, reject: (err: any) => void) {
        Request.postJson(Urls.CHECK_MOBILE_CODE_API, checkPhoneCodeParams, 'payCenter', true, false, '', (res) => {
            if (res.success) {
                resolve();
            } else {
                reject(res);
            }
        }, (err) => {
            reject(err);
        });
    });
}

export default {
    getSessionId,
    getSmsVerifyCode,
    checkMobileCode,
}