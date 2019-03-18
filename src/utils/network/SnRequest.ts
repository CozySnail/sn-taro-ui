import Taro from '@tarojs/taro';

/**
 * Taro Request 工具类
 * @Author snail
 */
function postForm(): void {
  const contentType = 'application/json';
  const header = {'content-type': contentType};
  console.log('ENV_TYPE.WEB : ', Taro.ENV_TYPE.WEB);
  Taro.request({
    url: 'https://payuat.p6air.com/JZPay/api/system/get-session-id',
    data: {},
    method: 'POST',
    header,
    success(res) {
      console.log('res : ', res);
      return res;
    },
    fail(e) {
      console.log('api', '请求接口出现问题', e);
    },
    complete() {
      console.info('加载完成');
    },
  }).then(res => console.log(res.data));
}

export default {
  postForm
};
