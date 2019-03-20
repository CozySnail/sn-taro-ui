/**
 * @Description: 加密数据,并返回带有sign的数据对象
 * @author snail
 * @date 2019-03-20
 * @param {string} parentId   合作方的 key
 * @param {string} secret     合作方的 secret
 * @param {Object} data       需要加密的数据
 */
declare function encode(parentId: string, secret: string, data?: Object): JSON ;

/**
 * @Description: 解密已经解密过的 secret 得到真正的 secret
 * @author snail
 * @date 2019-03-20
 * @param {string} parentId   合作方的 key
 * @param {string} encryptedSecret     合作方已经加密处理过的 secret
 */
declare function decryptForEncryptedSecret(parentId: string, encryptedSecret: string): string ;

/**
 * @Description: 加密前使用该方法进行参数排序
 * @author snail
 * @date 2019-03-20
 * @param {string}  property 排序依据的属性
 */
declare function compareForMD5(property: string): any ;

/**
 * @Description: 生成加密后的 sign
 * @author snail
 * @date 2019-03-20
 * @param {string} strSrc   需要加密的源字符串
 */
declare function encodeData(strSrc: string): string ;

/**
 * @Description: 将真正的 secret 进行加密处理
 * @author snail
 * @date 2019-03-20
 * @param {string} parentId   合作方的 key
 * @param {string} secret     合作方的 secret
 */
declare function genEncryptedSecret(parentId: string, secret: string): string ;

declare const SignUtil: {
  encode: typeof encode;
  decryptForEncryptedSecret: typeof decryptForEncryptedSecret;
  encodeData: typeof encodeData;
  genEncryptedSecret: typeof genEncryptedSecret;
};
export default SignUtil;
