/**
 * 文件上传 工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {StringUtil} from 'sn-js-utils';
import SnRequest from './SnRequest';
import result from './Result';


/**
 * @Description: 文件上传 仅限 H5 / WEB 请求
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param file {File}    需要上传的文件对象
 * @param uploadedDir {string}  默认 'uploadFiles' 需要调用的接口属于哪个系统 'bussiness'(默认): 业务系统, 'payCenter': 支付平台
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function uploadH5(url, file, uploadedDir: string = 'uploadFiles', loading: boolean = false, loadingText: string = '正在上传', success, failure): void {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('fileType', uploadedDir);

  let contentType = 'multipart/form-data';
  let header = SnRequest.setHeader(contentType);
  let options = SnRequest.setRequestOption(url, formData, 'POST', header, loading, success, failure);
  options['async'] = false;
  options['cache'] = false;
  options['processData'] = false;
  options['contentType'] = false;

  SnRequest.baseRequest(options, loading, loadingText);
}

/**
 * @Description: 文件上传 非 H5 / WEB 请求
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param filePath {string}    需要上传的文件路径
 * @param uploadedDir {string}  默认 'uploadFiles' 需要调用的接口属于哪个系统 'bussiness'(默认): 业务系统, 'payCenter': 支付平台
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 * @return
 *  返回 uploadTask 任务对象
 *  可以同过此对象进行展示实时上传进度和取消上传任务
 *  uploadTask.progress((res) => {
 *    console.log('上传进度', res.progress);
 *    console.log('已经上传的数据长度', res.totalBytesSent);
 *    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
 * });
 */
function uploadFile(url, filePath: string, uploadedDir: string = 'uploadFiles', loading: boolean = false, loadingText: string = '正在上传', success, failure): any {
  const options = setUploadRequestOption(url, filePath, uploadedDir, loading, success, failure);
  return baseUpload(options, loading, loadingText);
}

function baseUpload(options, loading, loadingText) {
  if (loading && loadingText && StringUtil.isNotEmpty(loadingText)) {
    Taro.showLoading({
      title: loadingText,
      mask: true
    }).then(() => {
      return upload(options);
    });
  } else {
    return upload(options);
  }
}

function upload(options) {
  return Taro.uploadFile(options);
}

/**
 * @Description: 上传文件接口请求参数设置
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param filePath {string}    需要上传的文件路径
 * @param uploadedDir {string}  默认 'uploadFiles' 需要调用的接口属于哪个系统 'bussiness'(默认): 业务系统, 'payCenter': 支付平台
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function setUploadRequestOption(url, filePath: string, uploadedDir: string = 'uploadFiles', loading = false, success, failure) {
  let formData = {fileType: uploadedDir};
  return {
    url,
    filePath,
    name: 'file',
    formData,
    success: (res) => {
      if (loading) {
        Taro.hideLoading();
      }
      result.dealWithRequestSuccess(res, success);
    },
    fail: (e) => {
      if (loading) {
        Taro.hideLoading();
      }
      result.dealWithRequestError(e, failure);
    },
    complete: () => {
      if (loading) {
        Taro.hideLoading();
      }
    }
  };
}

export default {
  uploadFile,
  uploadH5,
};
