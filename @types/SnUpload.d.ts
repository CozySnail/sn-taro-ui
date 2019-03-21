/**
 * 文件上传 工具类
 * @Author snail
 */
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
declare function uploadH5(url, file, uploadedDir: string, loading: boolean, loadingText: string, success, failure): void;

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
 *
 * uploadTask.abort() // 取消上传任务
 */
declare function uploadFile(url, filePath: string, uploadedDir: string, loading: boolean, loadingText: string, success, failure): any;

declare const SnUpload: {
  uploadH5: typeof uploadH5;
  uploadFile: typeof uploadFile;
};
export default SnUpload;
