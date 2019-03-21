/**
 * Request 工具类
 * @Author snail
 */
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
declare function get(url: string, data: any, platformType: string, loading: boolean, loadingText: string, success: Function, failure: Function): void;

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
declare function postForm(url: string, data: any, platformType: string, loading: boolean, loadingText: string, success: Function, failure: Function): void;

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
declare function postJson(url: string, data: any, platformType: string, needSign: boolean, loading: boolean, loadingText: string, success: Function, failure: Function): void;

declare const SnRequest: {
  get: typeof get;
  postForm: typeof postForm;
  postJson: typeof postJson;
};
export default SnRequest;
