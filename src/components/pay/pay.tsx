import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import PayBase from './paybase';
import SnCheckEnv from '../../utils/SnCheckEnv';


import alipayIcon from '../../asset/images/alipay-icon@3x.png';
import wechatPayIcon from '../../asset/images/wechatpay-icon@3x.png';

/**
 * 支付相关参数配置
 */
interface IConfig {

    /**
     * 图标
     */
    icon?: string,

    /**
     * 文案
     */
    title?: string,

    /**
     * 支付平台配置的id
     * 根据 {type} 参数来决定该配置是微信还是支付宝
     */
    configId: string,

    /**
     * 支付回调地址
     */
    notifyUrl: string,

    /**
     * 支付回调地址的回传参数
     */
    passbackParams?: any,
}

// 设置组件的 props 接口
interface IProps {
    /**
     * 订单号
     */
    orderNum: string,

    /**
     * 商品价格
     */
    price: number,
    
    /**
     * 商品描述
     */
    productDesc: string,

    /**
     * 支付成功回跳地址
     */
    successUrl: string,

    /**
     * 支付宝支付参数
     */
    aliConfig: IConfig,

    /**
     * 微信小程序支付参数
     */
    weappConfig: IConfig,

    /**
     * 微信公众号支付参数
     */
    wechatConfig: IConfig,
}

// 设置组件的 state 接口
interface IState {
}

/**
 * 支付组件
 * 
 * @description 根据环境自动判断可用支付方式，配置时需要提供所有的配置参数，如果只想使用指定的支付方式，则可以直接使用 `PayBase` 组件
 * 
 */
export default class Pay extends Component<IProps, IState> {

    static defaultProps = {
    }

    render() {
        let { orderNum, price, productDesc, successUrl } = this.props;

        return (
            <View className='pay-container'>
                {
                    // 非微信环境，可使用支付宝支付
                    !SnCheckEnv.isWeChat() && (
                        <PayBase
                            icon={this.props.aliConfig.icon || alipayIcon}
                            title={this.props.aliConfig.title || '支付宝支付'}
                            config={{
                                type: 'alipay',
                                configId: this.props.aliConfig.configId,
                                orderNum: orderNum,
                                price: price,
                                productDesc: productDesc,
                                successUrl: successUrl,
                                notifyUrl: this.props.aliConfig.notifyUrl,
                                passbackParams: this.props.aliConfig.passbackParams,
                            }}
                        />
                    )
                }

                {
                    SnCheckEnv.isWeApp() ? (
                        // 微信小程序环境
                        <PayBase
                            icon={this.props.weappConfig.icon || wechatPayIcon}
                            title={this.props.weappConfig.title || '微信小程序支付'}
                            config={{
                                type: 'weapp',
                                configId: this.props.weappConfig.configId,
                                orderNum: orderNum,
                                price: price,
                                productDesc: productDesc,
                                successUrl: successUrl,
                                notifyUrl: this.props.weappConfig.notifyUrl,
                                passbackParams: this.props.weappConfig.passbackParams,
                            }}
                        />
                    ) : (
                            // 非微信小程序环境
                            <PayBase
                                icon={this.props.wechatConfig.icon || wechatPayIcon}
                                title={this.props.wechatConfig.title || '微信支付'}
                                config={{
                                    type: 'wechat',
                                    configId: this.props.wechatConfig.configId,
                                    orderNum: orderNum,
                                    price: price,
                                    productDesc: productDesc,
                                    successUrl: successUrl,
                                    notifyUrl: this.props.wechatConfig.notifyUrl,
                                    passbackParams: this.props.wechatConfig.passbackParams,
                                }}
                            />
                        )
                }
            </View>
        );
    }
}
