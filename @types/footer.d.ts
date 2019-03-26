import {ComponentClass} from 'react';

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
export interface FooterProps {
  // 背景颜色
  bgColor?: string,

  // 底部高度
  height?: any, // 标题栏高度
}

declare const Footer: ComponentClass<FooterProps>;

export default Footer;
