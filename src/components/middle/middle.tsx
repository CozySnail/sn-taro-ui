import Taro, {Component} from '@tarojs/taro';
import {ScrollView, View} from '@tarojs/components';

import './middle.scss';

/**
 * @Description: 通用布局组件, 中间可滚动部分组件
 * @author snail
 * @date 2019-03-25
 * @param bgColor {string} 背景颜色, 默认 #ffffff
 *
 * @example
 * <Middle bgColor={this.props.middleBgColor}>
 *    <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
 *    <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
 * </Middle>
 */

// 设置组件参数属性
interface IProps {
  // 背景颜色
  bgColor?: string,
}

// 设置 state 属性
interface IState {
  height: number,
}

export default class Middle extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {
    // 背景颜色
    bgColor: '#ffffff',
  };

  render() {
    return (
      <View className='mid-content'>
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={{height: '100%', width: '100%', backgroundColor: this.props.bgColor}}
          lowerThreshold={20}
          upperThreshold={20}
        >
          {this.props.children}
        </ScrollView>
      </View>

    );
  }
}
