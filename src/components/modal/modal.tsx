import Taro, {Component} from '@tarojs/taro';
import {Button, ScrollView, Text, View} from '@tarojs/components';
import {AtIcon} from 'taro-ui';

import './modal.scss';
import {StringUtil} from 'sn-js-utils';

// 设置组件参数属性
interface IProps {
  // 图标
  icon?: string,
  iconColor?: string,
  iconSize?: number,

  // 标题
  title?: string,
  titleTextSize?: number,
  titleTextColor?: string,
  titleBgColor?: string,

  // 副标题
  subTitle?: string,
  subTitleTextSize?: number,
  subTitleTextColor?: string,

  // 内容
  content: string,
  contentTextSize?: number,
  contentTextColor?: string,

  // 确认按钮
  confirmText?: string,
  confirmBtnTextColor?: string,
  confirmBtnBgColor?: string,

  // 取消按钮
  cancelText?: string,
  cancelBtnTextColor?: string,
  cancelBtnBgColor?: string,

  // 回调函数
  onConfirm?(): void,

  onCancel?(): void
}

// 设置 state 属性
interface IState {
}

export default class Modal extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {
    // 图标
    icon: '',
    iconColor: '#8e8c8c36',
    iconSize: 20,

    // 标题
    title: '',
    titleTextSize: 20,
    titleTextColor: '#858585',
    titleBgColor: '#ffffff',

    // 副标题
    subTitle: '',
    subTitleTextSize: 20,
    subTitleTextColor: '#5c89e4',

    // 内容
    content: '',
    contentTextSize: 20,
    contentTextColor: '#acacac',

    // 确认按钮
    confirmText: '',
    confirmBtnTextColor: '#5c89e4',
    confirmBtnBgColor: '#FFFFFF',

    // 取消按钮
    cancelText: '',
    cancelBtnTextColor: '#acacac',
    cancelBtnBgColor: '#FFFFFF',
  };

  confirm = () => {
    this.props.onConfirm && this.props.onConfirm();
  };

  cancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    let confirmBtnClass = (this.props.cancelText && StringUtil.isNotEmpty(this.props.cancelText)) ? 'confirm-btn' : 'no-cancel-confirm-btn';
    let cancelBtnClass = (this.props.confirmText && StringUtil.isNotEmpty(this.props.confirmText)) ? 'cancel-btn' : 'no-cancel-confirm-btn';
    return (
      <View className='common-modal' onClick={this.cancel}>
        <View className='main'>
          {
            (this.props.title && StringUtil.isNotEmpty(this.props.title)) && (
              <View className='at-row' style={{backgroundColor: this.props.titleBgColor}}>
                <View className='title-row'>
                  {
                    (this.props.icon && StringUtil.isNotEmpty(this.props.icon)) ? (
                      <AtIcon prefixClass='fa' value={this.props.icon} color={this.props.iconColor}
                              size={this.props.iconSize} className='at-icon' />
                    ) : null
                  }
                  <View className='title'
                        style={{color: this.props.titleTextColor, fontSize: this.props.titleTextSize}}>
                    {this.props.title}
                  </View>
                  <View className='at-col at-col-1 at-col--wrap'>
                  </View>
                </View>
              </View>
            )
          }

          {
            (this.props.subTitle && StringUtil.isNotEmpty(this.props.subTitle)) && (
              <View className='sub-title'
                    style={{fontSize: this.props.subTitleTextSize, color: this.props.subTitleTextColor}}>
                {this.props.subTitle}
              </View>
            )
          }


          <View className='content'>
            <ScrollView
              className='content-scroll'
              scrollY
              scrollWithAnimation
            >
              <Text style={{fontSize: this.props.contentTextSize, color: this.props.contentTextColor}}>{this.props.content}</Text>
            </ScrollView>
          </View>

          {
            ((this.props.cancelText && StringUtil.isNotEmpty(this.props.cancelText)) || (this.props.confirmText && StringUtil.isNotEmpty(this.props.confirmText))) && (
              <View className='btn-view'>
                {
                  (this.props.cancelText && StringUtil.isNotEmpty(this.props.cancelText)) && (
                    <Button
                      plain
                      className={cancelBtnClass}
                      style={{backgroundColor: this.props.cancelBtnBgColor, color: this.props.cancelBtnTextColor}}
                      type='primary'
                      onClick={this.cancel.bind(this)}
                    >
                     {this.props.cancelText}
                    </Button>
                  )
                }

                {
                  (this.props.confirmText && StringUtil.isNotEmpty(this.props.confirmText)) && (
                    <Button
                      plain
                      className={confirmBtnClass}
                      style={{backgroundColor: this.props.confirmBtnBgColor, color: this.props.confirmBtnTextColor}}
                      type='primary'
                      onClick={this.confirm.bind(this)}
                    >
                      {this.props.confirmText}
                    </Button>
                  )
                }
              </View>
            )
          }
        </View>
      </View>
    );
  }
}
