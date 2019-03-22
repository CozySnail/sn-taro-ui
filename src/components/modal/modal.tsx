import Taro, {Component} from '@tarojs/taro';
import {ScrollView, Text, View} from '@tarojs/components';
import {AtButton, AtIcon} from 'taro-ui';

import './modal.scss';
import {StringUtil} from 'sn-js-utils';

interface IProps {
  icon: string | '',
  iconColor?: string | '#cf65ff',
  iconSize?: number | 50,
  title: string | '',
  subTitle: string | '',
  content: string | '',
  subContent?: string | '',
  confirmText: string | '',
  cancelText: string | '',
  titleColor?: string | '#FFFFFF',
  titleBgColor?: string | '#6DAAFA',
  cancelBtnColor?: string | '#4A4A4A',
  cancelBtnBgColor?: string | '#f5f2f2',
  confirmBtnColor?: string | '#FFFFFF',
  confirmBtnBgColor?: string | '#5c89e4',
  btnGroupsTopBorderColor?: string | '#cecece'

  onConfirm?(): void,

  onCancel?(): void
}

interface IState {
  diffTime: number,
  remainHour: number,
  remainMin: number,
  remainSec: number
}

export default class Modal extends Component<IProps, IState> {
  confirm = () => {
    this.props.onConfirm && this.props.onConfirm();
  };

  cancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    let confirmBtnClass = (this.props.cancelText && StringUtil.isNotEmpty(this.props.cancelText)) ? 'confirm-btn' : 'no-cancel-confirm-btn';
    return (
      <View className='common-modal' onClick={this.cancel}>
        <View className='main'>
          {
            (this.props.title && StringUtil.isNotEmpty(this.props.title)) && (
              <View className='at-row' style={{backgroundColor: this.props.titleBgColor}}>
                <View className='title-row'>
                  <View className='at-col at-col-1 at-col--wrap'>
                    <AtIcon prefixClass='fa' value={this.props.icon} color={this.props.iconColor}
                            size={this.props.iconSize} className='at-icon' />
                  </View>
                  <View className='at-col'>
                    <View className='title' style={{color: this.props.titleColor}}>
                      {this.props.title}{this.props.iconSize}
                    </View>
                  </View>
                  <View className='at-col at-col-1 at-col--wrap'>
                  </View>
                </View>
              </View>
            )
          }

          {
            (this.props.subTitle && StringUtil.isNotEmpty(this.props.subTitle)) && (
              <View className='sub-title'>
                {this.props.subTitle}
              </View>
            )
          }

          <ScrollView
            className='content'
            scrollY
            scrollWithAnimation
          >
            <Text>{this.props.content}</Text>
            <Text>{this.props.subContent}</Text>
          </ScrollView>
          {
            ((this.props.cancelText && StringUtil.isNotEmpty(this.props.cancelText)) || (this.props.confirmText && StringUtil.isNotEmpty(this.props.confirmText))) && (
              <View className='btn-view'>
                {
                  (this.props.cancelText && StringUtil.isNotEmpty(this.props.cancelText)) && (
                    <AtButton
                      className='cancel-btn'
                      customStyle={{backgroundColor: this.props.cancelBtnBgColor, color: this.props.cancelBtnColor}}
                      full
                      type='primary'
                      onClick={this.cancel}
                    >
                      {this.props.cancelText}
                    </AtButton>
                  )
                }
                <AtButton
                  className={confirmBtnClass}
                  customStyle={{backgroundColor: this.props.confirmBtnBgColor, color: this.props.confirmBtnColor}}
                  full
                  type='primary'
                  onClick={this.confirm}
                >
                  {this.props.confirmText}
                </AtButton>
              </View>
            )
          }
        </View>
      </View>
    );
  }
}
