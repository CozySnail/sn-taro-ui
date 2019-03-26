import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';

import './footer.scss';

/**
 * @Description: 通用布局组件底部固定部分
 * @author snail
 * @date 2019-03-25
 *
 * @param height {any} 底部高度, 单位px, 默认 100px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param bgColor {string} 底部背景颜色, 默认 #ffffff
 *
 * @example
 * <Footer
 *   footHeight={100}
 *   footBgColor='#dedede'
 * >
 *   <View>
 *     <Text>底部1</Text>
 *     <Text>底部2</Text>
 *   </View>
 * </Footer>
 */

// 设置组件参数属性
interface IProps {
  // 背景颜色
  bgColor?: string,

  // 底部高度
  height?: any, // 标题栏高度
}

// 设置 state 属性
interface IState {
}

export default class Footer extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {
    // 背景颜色
    bgColor: '#ffffff',
    height: 100, // 标题栏高度
  };

  render() {
    return (
      <View className='foot-view' style={{backgroundColor: this.props.bgColor, height: Taro.pxTransform(this.props.height)}}>
        {this.props.children}
      </View>
    );
  }
}
