import {ComponentClass} from 'react';

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
export interface MiddleProps {
  // 背景颜色
  bgColor?: string,
}

declare const Middle: ComponentClass<MiddleProps>;

export default Middle;
