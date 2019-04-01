import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';

import './solid-circle.scss';

/**
 * @Description: 实心圆组件
 * @author MeSKiL
 * @date 2019-03-27
 *
 * @param radius {any} 实心圆半径(不包括边框), 单位px, 默认 10px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param backgroundColor {string} 返回实心圆背景颜色, 默认 black
 *
 * @param requireBorder {boolean} 是否需要边框, 默认false (requireBorder为true时，borderSize与borderColor生效)
 * @param borderWidth {any} 边框大小， 单位px, 默认 0px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param borderColor {string} 返回边框颜色,默认black
 * @param borderStyle {string} 边框线,默认solid
 * @example
 *   <SolidCircle
 *    // 实心圆
 *   radius={15} //实心圆半径
 *   backgroundColor='red'  // 实心圆背景颜色
 *
 *   // 边框
 *   borderWidth={5} //边框大小
 *   borderColor = 'blue' //边框颜色
 *   borderStyle = 'dashed' //边框线
 *
 *   // 是否需要边框
 *   requireBorder
 *   />
 */

// 设置组件参数属性
interface IProps {
  // 实心圆
  radius?: any, // 实心圆半径
  backgroundColor?: string,  // 背景颜色

  // 边框
  borderWidth?: any, // 边框大小
  borderColor?: string,  // 返回边框颜色
  borderStyle?: string, //边框线

  // 是否需要border
  requireBorder?: boolean
}

// 设置 state 属性
interface IState {
}

export default class SolidCircle extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {
    // 实心圆
    radius: 10, // 实心圆半径
    backgroundColor: 'black', // 背景颜色

    // 边框
    borderWidth: 0, //边框大小
    borderColor: 'red', // 边框颜色
    borderStyle: 'solid',

    // 是否需要border
    requireBorder: false
  };
  render() {

    return (
      <View>
        {this.props.requireBorder ?
          (<View style={
            {
              height:Taro.pxTransform(this.props.radius*2),
              width:Taro.pxTransform(this.props.radius*2),
              backgroundColor:this.props.backgroundColor,
              borderWidth:Taro.pxTransform(this.props.borderWidth),
              borderStyle:this.props.borderStyle,
              borderColor:this.props.borderColor,
              borderRadius:Taro.pxTransform(this.props.radius+this.props.borderWidth)
            }
          }
          />):
          (<View style={
            {
              height:Taro.pxTransform(this.props.radius*2),
              width:Taro.pxTransform(this.props.radius*2),
              backgroundColor:this.props.backgroundColor,
              borderRadius:Taro.pxTransform(this.props.radius)
            }
          }
          />)
        }
      </View>
    );
  }
}
