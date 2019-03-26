import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';

import Header from '../header/header';
import Middle from '../middle/middle';
import Footer from '../footer/footer';

import './container.scss';

/**
 * @Description: 通用布局组件, 上中下结构, 头部和底部固定
 * @author snail
 * @date 2019-03-25
 * @param bgColor {string} 背景颜色, 默认 #ffffff
 *
 * @param titleHeight {any} 标题栏高度, 单位px, 默认 100px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param title {string} 标题内容, 默认 null
 * @param titleTextColor {string} 标题字体颜色, 默认 #1E242A
 * @param titleTextSize {any} 标题字体大小, 默认 50px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 *
 * @param showBack {boolean} 是否显示返回按钮, 默认 true
 * @param backText {string} 返回按钮文字, 默认 返回
 * @param backTextColor {string} 返回按钮字体颜色, 默认 #5c89e4
 * @param backTextSize {any} 返回按钮字体大小, 默认 30px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param backIconColor {string} 返回按钮图标颜色, 默认 #5c89e4
 *
 * @param middleBgColor {string} 内容区域背景颜色, 默认 #ffffff

 *
 * @param footHeight {any} 底部高度, 单位px, 默认 100px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param footBgColor {string} 底部背景颜色, 默认 #ffffff
 * @param footer {any} 底部自定义组件, 默认 null , 可以为任意视图
 *
 * @example
 * const footer = (
 *   <View>
 *   <Text>底部1</Text>
 *   <Text>底部2</Text>
 *   </View>
 * );
 *
 * <Container
 *   // 背景颜色
 *   bgColor='#ffffff'
 *
 *   // 标题
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
 *
 *   // 背景颜色
 *   middleBgColor='#acacac'
 *
 *   footHeight={100}
 *   footBgColor='#dedede'
 *   footer={footer}
 *   >
 *   <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
 *   <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
 *   ...
 * </Container>
 */

// 设置组件参数属性
interface IProps {
  // 背景颜色
  bgColor?: string,

  /* 头部配置*/
  // 标题
  titleHeight?: any, // 标题栏高度
  title?: string,  // 标题内容
  titleTextColor?: string, // 文字颜色
  titleTextSize?: any,  // 文字大小

  // 返回按钮
  backText?: string, // 返回按钮文字
  backTextColor?: string,  // 返回按钮文字颜色
  backTextSize?: any, // 返回按钮文字大小
  backIconColor?: string, // 返回图标颜色

  // 是否显示返回按钮
  showBack?: boolean,

  /* 内容区域配置*/
  // 背景颜色
  middleBgColor?: string,

  /* 底部配置 */
  footHeight?: any, // 底部高度
  footBgColor?: string,
  footer: any
}

// 设置 state 属性
interface IState {
}

export default class Container extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {
    // 背景颜色
    bgColor: '#ffffff',

    /* 头部配置*/
    // 标题
    titleHeight: 100, // 标题栏高度
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

    /* 内容区域配置*/
    // 背景颜色
    middleBgColor: '#ffffff',

    /* 底部配置 */
    footHeight: 100, // 底部高度
    footBgColor: '#ffffff',
    footer: null,
  };

  render() {
    return (
      <View className='container-content' style={{backgroundColor: this.props.bgColor}}>
        <Header
          height={this.props.titleHeight}
          title={this.props.title}
          titleTextColor={this.props.titleTextColor}
          titleTextSize={this.props.titleTextSize}
          backText={this.props.backText}
          backTextColor={this.props.backTextColor}
          backTextSize={this.props.backTextSize}
          backIconColor={this.props.backIconColor}
          showBack={this.props.showBack}
        />
        <Middle bgColor={this.props.middleBgColor}>
          {this.props.children}
        </Middle>
        {
          this.props.footer && (
            <Footer height={this.props.footHeight} bgColor={this.props.footBgColor}>
              {this.props.footer}
            </Footer>
          )
        }
      </View>
    );
  }
}
