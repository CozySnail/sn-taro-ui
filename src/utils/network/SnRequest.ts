/**
 * Request 工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';

/**
 * @Description: POST 请求, 请求方式为表单提交方式
 * @author snail
 *
 * @date 2019-03-18
 * @param url {string}          接口地址
 * @param data {Object}           参数
 * @param success {function}    成功回调
 * @param failure {function}    失败回调
 */
function postForm(url: string, data: Object = {}, success: Function, failure: Function): void {
  const contentType = 'application/x-www-form-urlencoded';
  const header = {'content-type': contentType};
  Taro.request({
    url,
    data,
    method: 'POST',
    header,
    success: (res) => {
      console.log('res : ', res);
      success && success(res);
    },
    fail: (e) => {
      console.log('api', '请求接口出现问题', e);
      failure && failure(e);
    },
    complete: () => {
      console.info('加载完成');
    },
  }).then(res => console.log(res.data));
}

export default {
  postForm
};
