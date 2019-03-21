/**
 * 文件下载 工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {StringUtil} from 'sn-js-utils';
import result from './Result';

/**
 * @Description: 文件上传 非 H5 / WEB 请求
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param loadingText {string}  默认 '正在加载'  正在加载的提示内容
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 * @return
 *  返回 downloadTask 任务对象
 *  可以同过此对象进行展示实时上传进度和取消上传任务
 *  downloadTask.progress((res) => {
 *    console.log('下载进度', res.progress)
 *    console.log('已经下载的数据长度', res.totalBytesWritten)
 *    console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
 *  })
 *  downloadTask.abort(); // 取消下载任务
 */
function downloadFile(url, loading: boolean = false, loadingText: string = '正在上传', success, failure): any {
  const options = setDownloadRequestOption(url, loading, success, failure);
  return baseDownload(options, loading, loadingText);
}

function baseDownload(options, loading, loadingText) {
  if (loading && loadingText && StringUtil.isNotEmpty(loadingText)) {
    Taro.showLoading({
      title: loadingText,
      mask: true
    }).then(() => {
      return download(options);
    });
  } else {
    return download(options);
  }
}

function download(options) {
  return Taro.downloadFile(options);
}

/**
 * @Description: 上传文件接口请求参数设置
 * @author snail
 * @date 2019-03-21
 * @param url {string}  接口地址
 * @param loading {boolean}  默认 false      是否需要显示正在加载
 * @param success {function}       成功回调函数
 * @param failure {function}       失败回调函数
 */
function setDownloadRequestOption(url, loading = false, success, failure) {
  return {
    url, //仅为示例，并非真实的资源
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
  downloadFile,
};
