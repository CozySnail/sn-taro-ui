/**
 * 缓存工具类
 * @Author snail
 */

/**
 * @Description:          从缓存中读取数据
 * @param {string} key    需要读取数据的 key
 * @author snail
 * @date 2019-03-19
 * @return {any}          返回数据结果, 为使用时方便判断,内容为空则返回 false
 */
declare function get(key: string): any;

/**
 * @Description:          保存数据到缓存
 * @param {string} key    需要保存数据的 key
 * @param {Object | String} value     需要保存的数据
 * @author snail
 * @date 2019-03-19
 */
declare function save(key: string, value: Object | String): void;

/**
 * @Description:          删除数据缓存
 * @param {string} key    需要删除数据的 key
 * @author snail
 * @date 2019-03-19
 */
declare function remove(key: string): void;

/**
 * @Description:          清空数据缓存
 * @author snail
 * @date 2019-03-19
 */
declare function clear(): void;

/**
 * @Description:            从缓存中批量清空数据
 * @param {Array} bussKeys  需要清空数据的所有 key 集合, 类型为数组
 * @author snail
 * @date 2019-03-19
 */
declare function clearByKeys(bussKeys: Array<string>): void;

declare const SnStorage: {
  get: typeof get;
  save: typeof save;
  remove: typeof remove;
  clear: typeof clear;
  clearByKeys: typeof clearByKeys;
};
export default SnStorage;
