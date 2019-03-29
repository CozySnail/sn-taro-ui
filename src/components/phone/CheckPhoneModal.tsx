import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { AtInput } from 'taro-ui';
import { StringUtil, DateUtil } from 'sn-js-utils';

import Modal from '../modal/modal';
import SnReqUtil from '../../utils/SnReqUtil';

import './checkPhoneModal.scss';

const paycenterurl = 'https://payuat.p6air.com/JZPay/servlet/validateCodeServlet';
const partialParams = {
    parentId: '1',
    secret: 'U2FsdGVkX19Pef5Cbb0QsWOiQGXtf04Wioh1KTxpF0YbVjC2KjSBo+jsZ6pwJ/0aSF3x+DrkdF1XJKdzi7pOqEFznw3Q28L3W1qW+m4+yUHpv2qBtrgn2Ev5jCZ66ERDr2MQOdaxqhR4ZCenJjOXJgjx1xaLDZF+UynldOWULj3vtDhlQu2XXn2bOfv8lzlQsTjqZ5nnm4bhrXJqYvaZRQHyPyB9Y6MeSZIysXceU+IO5fT2rr/uPOdTyXwLKY3lZHIBrovSOI0zK6d9H96lQzoy1nB5pILKggBx2wbkTrq7GxvlzUVyEQNKTIdTT8DO',
    userSource: 'other',
};

/**
 * 组件 Props 接口
 */
interface IProps {
    /**
     * 标题
     * 
     * 默认值: 登录
     */
    title: string,

    /**
     * 标题的字体颜色
     * 
     * 默认值: #333
     */
    titleColor: string,

    /**
     * 确认按钮的文本
     * 
     * 默认值: 确定
     */
    confirmText: string,

    /**
     * 取消按钮的文本
     * 
     * 默认值: 取消
     */
    cancelText: string,

    /**
     * confirm回调
     * 
     * 手机号验证通过后，会执行该回调
     * 会通过参数将一些必要的数据传出组件
     */
    onConfirmCallback?(value?: string): void,

    /**
     * cancel回调
     * 
     * 可以在这里执行一些自定义的逻辑，在Modal关闭时会被调用
     * 注：不需要提供Modal的关闭逻辑，组件内部会进行处理
     */
    onCancelCallback?(): void,
}

/**
 * 组件内部 State 接口
 */
interface IState {
    // 手机号
    phone: string,

    // 图形验证码
    imgCode: string,

    // 短信验证码
    code: string,

    phoneInputErrorTitle: string,
    phoneInputError: boolean,
    imgCodeInputErrorTitle: string,
    imgCodeInputError: boolean,
    codeInputErrorTitle: string,
    codeInputError: boolean,

    // 1分钟倒计时的秒数
    time: number,
    // 发送验证码按钮的文本
    sendBtnText: string,
    // 发送验证码按钮的禁用状态
    sendBtnDisabled: boolean,

    sessionId: string,

    // 图形验证码的地址
    imgCodeUrl: string,
}


/**
 * 手机验证组件
 */
export default class CheckPhoneModal extends Component<IProps, IState> {
    static defaultProps = {
        title: '登录',
        titleColor: '#333',
        confirmText: '确定',
        cancelText: '取消',
    }

    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            imgCode: '',
            code: '',

            phoneInputError: false,
            phoneInputErrorTitle: '',
            imgCodeInputError: false,
            imgCodeInputErrorTitle: '',
            codeInputError: false,
            codeInputErrorTitle: '',

            time: 60,
            sendBtnText: '发送验证码',
            sendBtnDisabled: false,

            sessionId: '',
            imgCodeUrl: '',
        }
    }

    componentWillMount() {
        this.refreshSessionId();
    }


    // 刷新图形验证码
    refreshGraphicsCode = () => {
        this.setState({
            imgCodeUrl: paycenterurl + '?jeeplus.session.id=' + this.state.sessionId + '&' + DateUtil.timestamp()
        });
    };
    // 刷新 sessionId
    refreshSessionId = () => {
        SnReqUtil.getSessionId().then(sessionId => {
            this.setState({
                sessionId,
                imgCodeUrl: paycenterurl + '?jeeplus.session.id=' + sessionId,
            });
        }).catch(err => {
            console.error(`get session id fail: ${err}`);
        });
    };
    // 刷新内部状态
    refreshInternalState = () => {
        this.refreshSessionId();
        this.refreshGraphicsCode();
    };

    // 取消按钮被点击
    onCancelModal() {
        this.props.onCancelCallback && this.props.onCancelCallback();
    }

    // 确认按钮被点击
    onConfirmModal() {
        const { phone, imgCode, code, sessionId } = this.state;

        if (StringUtil.isEmpty(phone)) {
            this.setState({
                phoneInputErrorTitle: '必填',
                phoneInputError: true,
            });
        }

        if (StringUtil.isEmpty(imgCode)) {
            this.setState({
                imgCodeInputErrorTitle: '必填',
                imgCodeInputError: true,
            });
        }

        if (StringUtil.isEmpty(code)) {
            this.setState({
                codeInputErrorTitle: '必填',
                codeInputError: true,
            });
        }

        if (StringUtil.isEmpty(phone) || StringUtil.isEmpty(imgCode) || StringUtil.isEmpty(code)) {
            return;
        }

        // 调用登录接口
        const checkMobileCodeParams = Object.assign({
            mobile: phone,
            verifyCode: code,
            sessionId: sessionId,
        }, partialParams);

        SnReqUtil.checkMobileCode(checkMobileCodeParams).then(() => {
            this.props.onConfirmCallback && this.props.onConfirmCallback();
        }).catch((err) => {
            console.warn(`check mobile code fail: ${err}`);
            Taro.showToast({
                title: '手机号验证失败',
                duration: 2000,
            });
        });

    }

    // 开启倒计时效果
    setTimer() {
        setTimeout(() => {
            this.setState((state) => ({
                time: state.time - 1,
                sendBtnText: (state.time - 1) + '秒后重新获取',
            }), () => {
                if (this.state.time <= 0) {
                    this.setState({
                        time: 60,
                        sendBtnText: '获取验证码',
                        sendBtnDisabled: false,
                    });
                } else {
                    // 循环调用
                    this.setTimer();
                }
            });
        }, 1000);
    }

    // 处理表单的 input 事件
    handleChange = (name: string, value: string) => {
        if (name === 'phone') {
            if (StringUtil.isEmpty(value)) {
                this.setState({
                    phone: value,
                    phoneInputError: true,
                    phoneInputErrorTitle: '必填',
                });
            } else {
                this.setState({
                    phone: value,
                    phoneInputError: false,
                    phoneInputErrorTitle: '',
                });
            }
        } else if (name === 'imgCode') {
            if (StringUtil.isEmpty(value)) {
                this.setState({
                    imgCode: value,
                    imgCodeInputError: true,
                    imgCodeInputErrorTitle: '必填',
                });
            } else {
                this.setState({
                    imgCode: value,
                    imgCodeInputError: false,
                    imgCodeInputErrorTitle: '',
                });
            }
        } else if (name === 'code') {
            if (StringUtil.isEmpty(value)) {
                this.setState({
                    code: value,
                    codeInputError: true,
                    codeInputErrorTitle: '必填',
                });
            } else {
                this.setState({
                    code: value,
                    codeInputError: false,
                    codeInputErrorTitle: '',
                })
            }
        }
    };



    // 发送短信验证码
    sendCode() {
        const { phone, imgCode, sessionId } = this.state;

        if (StringUtil.isEmpty(phone)) {
            this.setState({
                phoneInputErrorTitle: '必填',
                phoneInputError: true,
            });
        }

        if (StringUtil.isEmpty(imgCode)) {
            this.setState({
                imgCodeInputErrorTitle: '必填',
                imgCodeInputError: true,
            });
        }

        if (StringUtil.isEmpty(phone) || StringUtil.isEmpty(imgCode)) {
            return;
        }

        // 验证图形验证码，并发送短信验证码
        const getSmsVerifyCodeParams = Object.assign({
            mobile: phone,
            graphCode: imgCode,
            sessionId: sessionId,
        }, partialParams);

        SnReqUtil.getSmsVerifyCode(getSmsVerifyCodeParams).then(() => {
            // 验证成功
            this.setState({
                time: 60,
                sendBtnDisabled: true,
            }, () => {
                // 开启1分钟倒计时
                this.setTimer();
                // 刷新内部状态，方便下次直接重试 (不需要手动点击图形验证码图片手动刷新)
                this.refreshInternalState();
            });
            Taro.showToast({
                title: '发送成功',
                icon: 'success',
            });
        }).catch(err => {
            // 验证失败
            console.warn(`get sms verify code fail: ${err}`);

            this.refreshInternalState();
            this.setState({
                imgCode: '',
                code: '',
            });
            Taro.showToast({
                title: '获取验证码失败',
                duration: 2000,
            });
        });

    }


    render() {
        return (
            <Modal
                title={this.props.title}
                titleTextColor={this.props.titleColor}
                confirmText={this.props.confirmText}
                cancelText={this.props.cancelText}
                onConfirm={this.onConfirmModal.bind(this)}
                onCancel={this.onCancelModal.bind(this)}
            >
                <View className='modal-content-view'>
                    <AtInput
                        clear
                        name='phone'
                        error={this.state.phoneInputError}
                        title={this.state.phoneInputErrorTitle}
                        type='number'
                        maxLength={11}
                        placeholder='手机号码'
                        value={this.state.phone}
                        confirmType='完成'
                        onChange={this.handleChange.bind(this, 'phone')}
                    />
                    <AtInput
                        clear
                        name='imgCode'
                        error={this.state.imgCodeInputError}
                        title={this.state.imgCodeInputErrorTitle}
                        type='text'
                        maxLength={4}
                        placeholder='图形验证码'
                        value={this.state.imgCode}
                        confirmType='完成'
                        onChange={this.handleChange.bind(this, 'imgCode')}
                    >
                        <Image src={this.state.imgCodeUrl} onClick={this.refreshGraphicsCode.bind(this)} />
                    </AtInput>
                    <AtInput
                        name='code'
                        error={this.state.codeInputError}
                        title={this.state.codeInputErrorTitle}
                        type='text'
                        maxLength={6}
                        placeholder='短信验证码'
                        value={this.state.code}
                        confirmType='完成'
                        onChange={this.handleChange.bind(this, 'code')}
                    >
                        <Button
                            disabled={this.state.sendBtnDisabled}
                            className='send-code-btn'
                            plain
                            onClick={this.sendCode.bind(this)}
                        >
                            {this.state.sendBtnText}
                        </Button>
                    </AtInput>
                </View>
            </Modal>
        )
    }
}
