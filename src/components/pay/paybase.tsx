import Taro, { Component } from '@tarojs/taro';
import { Image, Text, View } from '@tarojs/components';

import SnAlipay from '../../utils/pay/alipay/SnAlipay';
import SnWeChatPay from '../../utils/pay/wechatPay/SnWeChatPay';


import './paybase.scss';
import arrowIcon from '../../asset/images/arrow-icon.png';



/**
 * 支付参数相关配置
 */
interface IPayConfig {

    /**
     * 支付方式
     * 
     * 该参数会影响 {configId} 的意义
     * alipay: 支付宝h5支付
     * wechat: 微信h5/公众号支付
     * weapp:   微信小程序支付
     */
    type: 'alipay' | 'wechat' | 'weapp',

    /**
     * 支付平台配置的id
     * 
     * 根据 `type` 参数来决定该配置是微信还是支付宝
     */
    configId: string,

    /**
     * 订单号
     */
    orderNum: string,

    /**
     * 商品价格
     * 
     * 单位：分
     */
    price: number,

    /**
     * 商品描述
     * 
     * 会原样传给支付宝或微信
     */
    productDesc: string,

    /**
     * 支付通知地址
     */
    notifyUrl: string,

    /**
     * 支付通知参数
     */
    passbackParams?: any,

    /**
     * 支付成功页面跳转地址
     */
    successUrl: string,

    /**
     * 支付失败页面跳转地址
     */
    failUrl?: string,

    /**
        * 回调函数
        */
    onCallback?(): void,
}

// 设置组件的 props 接口
interface IProps {

    /**
     * 显示模式
     * 
     * large: 通栏 (default)
     * small: 仅显示图标
     */
    mode: 'large' | 'small',

    /**
     * 图标
     */
    icon: string,

    /**
     * 文案
     * 
     * `mode` 参数为 `large` 时有效且必填
     */
    title?: string,

    /**
     * 是否显示右边箭头
     * 
     * `mode` 参数为 `large` 时有效
     * 默认为true
     */
    showArrow: boolean,


    /**
     * 图标大小
     * 
     * `mode` 参数为 `small` 时有效，默认52px
     */
    size: number,

    /**
     * 支付参数配置
     */
    config: IPayConfig,
}

// 设置组件的 state 接口
interface IState {
}

/**
 * @description 基础支付组件
 * @param mode {'large' | 'small'} 显示模式。large:通栏  small:仅显示图标
 * @param icon {string} 图标
 * @param title {string} 组件上的文案。比如 '微信支付'
 * @param showArrow {boolean} 是否显示右边箭头。默认为true
 * @param size {number} 图标大小。 `mode` 参数为 `small` 时有效，默认52px
 * @param config {IConfig} 支付配置对象
 * 
 * @example
 * <PayBase
 *    mode='large'
 *    icon={alipayIcon}
 *    title='支付宝支付'
 *    config={{
 *          type: 'alipay',
 *          configId: 'xxx',
 *          orderNum: '123456',
 *          price: 100,
 *          productDesc: '测试组件',
 *          successUrl: '/pages/index/index',
 *          notifyUrl: 'https://www.example.com/pay/notify',
 *    }}
 *  />
 * 
 */
export default class PayBase extends Component<IProps, IState> {

    static defaultProps = {
        mode: 'large',
        showArrow: true,
        size: 52,
    }

    toPay() {
        let { configId, productDesc, price, orderNum, successUrl, passbackParams, notifyUrl } = this.props.config;

        this._debug(this.props.config.type,configId, productDesc, orderNum, price, passbackParams, successUrl, notifyUrl);

        switch (this.props.config.type) {
            case 'alipay':
                // SnAlipay.applyPayH5(configId, productDesc, orderNum, price, passbackParams, successUrl, notifyUrl);
                break;
            case 'wechat':
                // SnWeChatPay.applyPayH5(configId, productDesc, orderNum, price, notifyUrl, passbackParams, successUrl, '', () => { });
                break;
            case 'weapp':
                // SnWeChatPay.applyPayMP(configId, productDesc, orderNum, price, notifyUrl, passbackParams, successUrl, '', () => { });
                break;
            default:
                throw new Error(`支付方式${this.props.config.type}不被支持`);
        }
    };

    _debug(type,configId, productDesc, orderNum, price, passbackParams, successUrl, notifyUrl) {
        console.log(`type: ${type}`);
        console.log(`configId: ${configId}`);
        console.log(`productDesc: ${productDesc}`);
        console.log(`orderNum: ${orderNum}`);
        console.log(`price: ${price}`);
        console.log(`passbackParams: ${passbackParams}`);
        console.log(`successUrl: ${successUrl}`);
        console.log(`notifyUrl: ${notifyUrl}`);
    }

    render() {
        if (this.props.mode === 'large') {
            return (
                <View className='pay-container-large' onClick={this.toPay.bind(this)}>
                    <View className='content'>
                        <Image className='icon' src={this.props.icon} />
                        <Text className='title'>{this.props.title}</Text>
                    </View>
                    {
                        this.props.showArrow && <Image className='arrow' src={arrowIcon} />
                    }
                </View>
            );
        }
        return (
            <View className='pay-container-small' onClick={this.toPay.bind(this)}>
                <Image
                    src={this.props.icon}
                    style={{
                        width: Taro.pxTransform(this.props.size),
                        height: Taro.pxTransform(this.props.size),
                    }}
                />
            </View>
        );
    }
}
