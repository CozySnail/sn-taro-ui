/**
 * 日志工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {DateUtil} from 'sn-js-utils';

/**
 * @Description: 错误日志输出
 * @author snail
 * @date 2019-03-19
 * @param {string} label
 * @param {string} action
 * @param {Object | string} info
 */
function logError(label: string, action?: string, info?: Object | string): void {
  let device;
  if (!info) {
    info = 'empty';
  }
  try {
    let deviceInfo = Taro.getSystemInfoSync();
    device = JSON.stringify(deviceInfo);
  } catch (err) {
    console.error('not support getSystemInfoSync api', err.message);
  }
  let time = DateUtil.formatDate();
  console.error(time, label, action, info, device);
  if (typeof info === 'object') {
    console.info(JSON.stringify(info));
  }
}

export default {
  logError,
};
