/**
 * Request 工具类
 * @Author snail
 */
import {REQUEST_STATUS} from './RequestStatus';
import SnLogUtil from '../SnLogUtil';

/**
 * @Description: 统一处理接口通讯成功后, 获取的结果
 * @author snail
 * @date 2019-03-21
 * @param res {JSON} 接口返回的结果
 * @param callback {function} 回调函数
 */
function dealWithRequestSuccess(res, callback) {
  let result = {};
  if (res.statusCode === REQUEST_STATUS.NOT_FOUND) {
    SnLogUtil.logError('api', '请求资源不存在');
    result = {
      success: false,
      code: res.statusCode,
      data: null,
      msg: '请求资源不存在',
    };
  } else if (res.statusCode === REQUEST_STATUS.BAD_GATEWAY || res.statusCode === REQUEST_STATUS.SERVER_ERROR) {
    SnLogUtil.logError('api', '服务端出现了问题');
    result = {
      success: false,
      code: res.statusCode,
      data: null,
      msg: '服务端出现了问题',
    };
  } else if (res.statusCode === REQUEST_STATUS.GATEWAY_TIMEOUT) {
    SnLogUtil.logError('api', '请求服务器超时');
    result = {
      success: false,
      code: res.statusCode,
      data: null,
      msg: '请求服务器超时',
    };
  } else if (res.statusCode === REQUEST_STATUS.FORBIDDEN) {
    SnLogUtil.logError('api', '没有权限访问');
    result = {
      success: false,
      code: res.statusCode,
      data: null,
      msg: '没有权限访问',
    };
  } else if (res.statusCode === REQUEST_STATUS.SUCCESS) {
    console.log(res);
    let {code, data, msg} = res.data;
    if (code === REQUEST_STATUS.REQUEST_SUCCESS_STATUS) { // 返回 code : 1000 认为是真正的成功
      result = {
        success: true,
        code: code,
        data: data,
        msg: msg,
      };
    } else { // 否则, 认为失败
      result = {
        success: false,
        code: code,
        data: data,
        msg: msg,
      };
    }
  }
  sendCallback(result, callback);
}

/**
 * @Description: 处理通讯失败结果，并执行回调函数
 * @author snail
 * @date 2019-03-21
 * @param exception {Object} 异常信息
 * @param callback {function} 回调函数
 */
function dealWithRequestError(exception, callback) {
  SnLogUtil.logError('api', '接口请求失败');
  let result = {
    success: false,
    code: 0,
    data: null,
    msg: '接口请求失败' + exception,
  };
  sendCallback(result, callback);
}

/**
 * @Description: 执行回调函数
 * @author snail
 * @date 2019-03-21
 * @param res {JSON} 接口返回的结果
 * @param callback {function} 回调函数
 */
function sendCallback(res, callback) {
  isFunction(callback) && callback(res);
}

/**
 * @Description: 判断参数是否为函数
 * @author snail
 * @date 2019-03-21
 * @param fn {function} 回调函数
 */
function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

export default {
  dealWithRequestSuccess,
  dealWithRequestError,
  sendCallback,
  isFunction,
};
