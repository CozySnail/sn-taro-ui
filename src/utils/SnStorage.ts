/**
 * 缓存工具类
 * @Author snail
 */
import Taro from '@tarojs/taro';
import {StringUtil} from 'sn-js-utils';
import SnLogUtil from './SnLogUtil';

/**
 * @Description:          从缓存中读取数据
 * @param {string} key    需要读取数据的 key
 * @author snail
 * @date 2019-03-19
 * @return {any}          返回数据结果, 为使用时方便判断,内容为空则返回 false
 */
function get(key: string): any {
  let result;
  try {
    result = Taro.getStorageSync(key);
  } catch (e) {
    result = false;
  }

  if (result && result !== 'undefined' && result !== 'null' && StringUtil.isNotEmpty(result)) {
    if (result instanceof Object || result instanceof Array) {
      if (Object.keys(result).length > 0 || result.length > 0) {
        return result;
      } else {
        return false;
      }
    } else {
      return result;
    }
  } else {
    result = false;
    return result;
  }
}

/**
 * @Description:          保存数据到缓存
 * @param {string} key    需要保存数据的 key
 * @param {Object | String} value     需要保存的数据
 * @author snail
 * @date 2019-03-19
 */
function save(key: string, value: Object | String): void {
  try {
    Taro.setStorageSync(key, value);
  } catch (e) {
    SnLogUtil.logError('保存缓存时出错', 'save data', e);
  }
}

/**
 * @Description:          删除数据缓存
 * @param {string} key    需要删除数据的 key
 * @author snail
 * @date 2019-03-19
 */
function remove(key: string): void {
  try {
    Taro.removeStorageSync(key);
  } catch (e) {
    SnLogUtil.logError('删除缓存时出错', 'remove data', e);
  }
}

/**
 * @Description:          清空数据缓存
 * @author snail
 * @date 2019-03-19
 */
function clear(): void {
  try {
    Taro.clearStorageSync();
  } catch (e) {
    SnLogUtil.logError('清除缓存时出错', 'clear data', e);
  }
}

/**
 * @Description:            从缓存中批量清空数据
 * @param {Array} bussKeys  需要清空数据的所有 key 集合, 类型为数组
 * @author snail
 * @date 2019-03-19
 */
function clearByKeys(bussKeys: Array<string>): void {
  bussKeys.map(item => {
    remove(item);
  });
}

export default {
  get,
  save,
  remove,
  clear,
  clearByKeys,
};
