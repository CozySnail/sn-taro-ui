/**
 * Request 工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {StringUtil} from 'sn-js-utils';
import SignUtil from './SignUtil';
import storage from '../SnStorage';
import result from './Result';

const token = storage.get('token');
const NEED_SIGN_FLAG = '/author';
const bussnessSessionId = storage.get('bussnessSessionId');
const payCenterSessionId = storage.get('payCenterSessionId');

/**
 * @Description: GET 请求
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param data {any}    接口请求数据
 * @param platformType {string}  默认 'bussiness' 需要调用的接口属于哪个系统 'bussiness'(默认): 业务系统, 'payCenter': 支付平台
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function get(url: string, data: any, platformType: string = 'bussiness', loading: boolean = false, loadingText: string = '正在加载', success: Function, failure: Function): void {
  const contentType = 'application/x-www-form-urlencoded';
  let header = setHeader(contentType, platformType);
  let options = setRequestOption(url, data, 'GET', header, loading, success, failure);
  baseRequest(options, loading, loadingText);
}

/**
 * @Description: POST FORM 请求
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param data {any}    接口请求数据
 * @param platformType {string}  默认 'bussiness' 需要调用的接口属于哪个系统 'bussiness'(默认): 业务系统, 'payCenter': 支付平台
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function postForm(url: string, data: any, platformType: string = 'bussiness', loading: boolean = false, loadingText: string = '正在加载', success: Function, failure: Function): void {
  const contentType = 'application/x-www-form-urlencoded';
  // data = generateFormParam(data);
  let header = setHeader(contentType, platformType);
  let options = setRequestOption(url, data, 'POST', header, loading, success, failure);
  baseRequest(options, loading, loadingText);
}

/**
 * @Description: POST JSON 请求
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param data {any}    接口请求数据
 * @param platformType {string}  默认 'bussiness' 需要调用的接口属于哪个系统 'bussiness'(默认): 业务系统, 'payCenter': 支付平台
 * @param needSign {boolean}  默认 false  请求接口时数据是否需要签名加密
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function postJson(url: string, data: any, platformType: string = 'bussiness', needSign: boolean = false, loading: boolean = false, loadingText: string = '正在加载', success: Function, failure: Function): void {
  const contentType = 'application/json';
  if (needSign || StringUtil.contains(url, NEED_SIGN_FLAG)) {
    data = SignUtil.encode(data.parentId, data.secret, data);
  }
  let header = setHeader(contentType, platformType);
  let options = setRequestOption(url, data, 'POST', header, loading, success, failure);
  baseRequest(options, loading, loadingText);
}

/**
 * @Description: 实际发起接口请求的方法
 * @author snail
 * @date 2019-03-21
 * @param options {Object}  接口请求参数设置
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 */
function baseRequest(options, loading, loadingText) {
  if (loading && loadingText && StringUtil.isNotEmpty(loadingText)) {
    Taro.showLoading({
      title: loadingText,
      mask: true
    }).then(() => {
      request(options);
    });
  } else {
    request(options);
  }
}

function request(options) {
  // Taro.addInterceptor(Taro.interceptors.logInterceptor);
  // Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);
  Taro.request(options).then(res => console.log(res.data));
}

function setHeader(contentType: string = '', platformType: string = '') {
  let header = {
    'Accept': 'application/json',
    // 'mode': "no-cors",
  };

  if (StringUtil.isNotEmpty(contentType)) {
    header['Content-Type'] = contentType;
  }

  if (StringUtil.isNotEmpty(token)) {
    header['token'] = token;
  }

  if (StringUtil.isNotEmpty(platformType)) {
    header['Cookie'] = platformType === 'bussiness' ? bussnessSessionId : payCenterSessionId;
  }

  return header;
}

/**
 * @Description: 接口请求参数设置
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param data {any}    接口请求数据
 * @param method {string}  接口请求的方式 : 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
 * @param header {Object}  接口请求头
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function setRequestOption(url, data, method, header, loading, success, failure) {
  return {
    url,
    data,
    method,
    header,
    success(res) {
      if (loading) {
        Taro.hideLoading();
      }
      result.dealWithRequestSuccess(res, success);
    },
    fail(e) {
      if (loading) {
        Taro.hideLoading();
      }
      result.dealWithRequestError(e, failure);
    },
    complete() {
      if (loading) {
        Taro.hideLoading();
      }
    },
  };
}

export default {
  get,
  postForm,
  postJson,
  setHeader,
  setRequestOption,
  baseRequest,
};
