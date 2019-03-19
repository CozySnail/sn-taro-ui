/**
 * 日志工具类
 * @Author snail
 */

/**
 * @Description: 错误日志输出
 * @author snail
 * @date 2019-03-19
 * @param {string} label
 * @param {string} action
 * @param {Object | string} info
 */
declare function logError(label: string, action?: string, info?: Object | string): void;

declare const SnLogUtil: {
  logError: typeof logError;
};
export default SnLogUtil;
