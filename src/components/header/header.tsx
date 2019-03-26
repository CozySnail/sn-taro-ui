import Taro, {Component} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import {AtIcon} from 'taro-ui';
import SnCheckEnv from '../../utils/SnCheckEnv';

import './header.scss';

/**
 * @Description: 通用布局组件, 头部固定部分
 * @author snail
 * @date 2019-03-25
 *
 * @param height {any} 标题栏高度, 单位px, 默认 100px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param title {string} 标题内容, 默认 null
 * @param titleTextColor {string} 标题字体颜色, 默认 #1E242A
 * @param titleTextSize {any} 标题字体大小, 默认 30px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 *
 * @param showBack {boolean} 是否显示返回按钮, 默认 true
 * @param backText {string} 返回按钮文字, 默认 返回
 * @param backTextColor {string} 返回按钮字体颜色, 默认 #5c89e4
 * @param backTextSize {any} 返回按钮字体大小, 默认 20px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param backIconColor {string} 返回按钮图标颜色, 默认 #5c89e4
 *
 * @example
 * <Header
 *    // 标题
 *   titleHeight={100}
 *   title='这里是标题'  // 标题内容
 *   titleTextColor='#1E242A' // 文字颜色
 *   titleTextSize={50}  // 文字大小
 *
 *   // 返回按钮
 *   backText='返回' // 返回按钮文字
 *   backTextColor='#5c89e4'  // 返回按钮文字颜色
 *   backTextSize={30} // 返回按钮文字大小
 *   backIconColor='#5c89e4' // 返回图标颜色
 *
 *   // 是否显示返回按钮
 *   showBack
 *   />
 */

// 设置组件参数属性
interface IProps {
  // 标题
  height?: any, // 标题栏高度
  title?: string,  // 标题内容
  titleTextColor?: string, // 文字颜色
  titleTextSize?: any,  // 文字大小

  // 返回按钮
  backText?: string, // 返回按钮文字
  backTextColor?: string,  // 返回按钮文字颜色
  backTextSize?: any, // 返回按钮文字大小
  backIconColor?: string, // 返回图标颜色

  // 是否显示返回按钮
  showBack?: boolean
}

// 设置 state 属性
interface IState {
}

export default class Header extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {
    // 标题
    height: 100, // 标题栏高度
    title: '', // 标题内容
    titleTextColor: '#1E242A',  // 文字颜色
    titleTextSize: 50,  // 文字大小

    // 返回按钮
    backText: '返回', // 返回按钮文字
    backTextColor: '#5c89e4',  // 返回按钮文字颜色
    backTextSize: 30, // 返回按钮文字大小
    backIconColor: '#5c89e4', // 返回图标颜色

    // 是否显示返回按钮
    showBack: true,
  };

  back = () => {
    Taro.navigateBack({delta: 1}).then();
  };

  render() {

    return (
      (SnCheckEnv.isWeApp() || SnCheckEnv.isWeChatMiniProgram() || SnCheckEnv.isWeChatPublic()) ? (<View />) : (
        <View className='title-container' style={{height: Taro.pxTransform(this.props.height)}}>
          {
            this.props.showBack ? (
              <View className='back-view' onClick={this.back.bind(this)}>
                <AtIcon value='chevron-left' size={this.props.backTextSize} color={this.props.backIconColor} />
                <Text style={{color: this.props.backTextColor, fontSize: Taro.pxTransform(this.props.backTextSize)}}>
                  {this.props.backText}
                </Text>
              </View>
            ) : (
              <View className='back-view' />
            )
          }
          <Text className='title'
                style={{color: this.props.titleTextColor, fontSize: Taro.pxTransform(this.props.titleTextSize)}}>
            {this.props.title}
          </Text>
          <View className='right-view' />
        </View>
      )
    );
  }
}
