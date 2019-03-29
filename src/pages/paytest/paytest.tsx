import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import Pay from '../../components/pay/pay';
import CheckPhoneModal from '../../components/phone/CheckPhoneModal';


interface IProps {

}
interface IState {
    showModal: boolean,
}

export default class PayTest extends Component<IProps, IState> {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: 'Pay组件测试'
    };

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
    }

    onAlipayClick() {
        console.log('alipay has clicked');
    }

    showModal() {
        this.setState({
            showModal: true,
        });
    }
    hideModal() {
        this.setState({
            showModal: false,
        });
    }

    render() {
        return (
            <View>
                <Pay
                    orderNum='123456'
                    price={10}
                    productDesc='组件测试'
                    successUrl='/pages/order/success'
                    aliConfig={{ configId: '123456', notifyUrl: 'https://www.example.com/notify/alipay', passbackParams: '123' }}
                    weappConfig={{ configId: '123xxx', notifyUrl: 'https://www.example.com/notify/weapp', passbackParams: '456' }}
                    wechatConfig={{ configId: '123000', notifyUrl: 'https://www.example.com/notify/wechat' }}
                />
                {/* <PayBase
                    icon='22'
                    title='支付宝支付'
                    config={{
                        configId: '123',
                        price: 12,
                        productDesc: '',
                        orderNum: '122',
                        type: 'alipay',
                        notifyUrl: '',
                        successUrl: '',
                    }}
                /> */}
                {
                    this.state.showModal && <CheckPhoneModal onCancelCallback={this.hideModal.bind(this)} />
                }

                <Button onClick={this.showModal.bind(this)}>验证手机号</Button>
            </View>
        );
    }
}

