/**
 * 文件下载 工具类
 * @Author snail
 */
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
declare function downloadFile(url, loading: boolean, loadingText: string, success, failure): any ;

declare const SnDownload: {
  downloadFile: typeof downloadFile;
};
export default SnDownload;
