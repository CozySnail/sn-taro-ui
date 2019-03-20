/**
 * Request 工具类
 * @Author snail
 */
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
declare function postForm(url: string, data: Object, success: Function, failure: Function): void;

declare const SnRequest: {
  postForm: typeof postForm;
};
export default SnRequest;
