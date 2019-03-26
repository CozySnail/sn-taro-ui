import { ComponentClass } from 'react'

/**
 * @Description: 通用 Modal
 * @author snail
 * @date 2019-03-25
 * @param icon {string} 标题图标, 默认 null, 遵循 Taro-UI 图标使用原则, 另: 新增了 FontAwesome 字体图标
 * @param iconColor {string} 设置标题图标颜色, 默认 #8e8c8c36, 当 icon 不为空时有效
 * @param iconSize {number} 标题图标大小 , 默认 20, 遵循 Taro-UI 图标使用原则
 * @param title {string} 标题内容, 默认 null
 * @param titleTextSize {number} 标题文字大小, 默认 20, 当 title 不为空时有效
 * @param titleTextColor {string} 标题文字颜色, 默认 #858585, 当 title 不为空时有效
 * @param titleBgColor {string} 标题背景色, 默认 #ffffff, 当 title 不为空时有效
 * @param subTitle {string} 副标题, 默认 null
 * @param subTitleTextSize {number} 副标题文字大小, 默认 20, 当 subTitle 不为空时有效
 * @param subTitleTextColor {string} 副标题文字颜色, 默认 #5c89e4, 当 subTitle 不为空时有效
 * @param content {string} Modal 内容, 必填属性
 * @param contentTextSize {number} Modal 内容文字大小, 默认 20, 当 content 不为空时有效
 * @param contentTextColor {string} Modal 内容文字颜色, 默认 #acacac, 当 content 不为空时有效
 * @param confirmText {string} 确认按钮文字, 默认 null 不显示确认按钮
 * @param confirmBtnTextColor {string}  确认按钮文字颜色, 默认 #5c89e4, 当 confirmText 不为空时有效
 * @param confirmBtnBgColor {string}  确认按钮背景颜色, 默认 #FFFFFF, 当 confirmText 不为空时有效
 * @param cancelText {string} 取消按钮文字, 默认 null 不显示取消按钮
 * @param cancelBtnTextColor {string}  取消按钮文字颜色, 默认 #acacac, 当 cancelText 不为空时有效
 * @param cancelBtnBgColor {string}  取消按钮背景颜色, 默认 #FFFFFF, 当 cancelText 不为空时有效
 * @param closeBtn {boolean}  是否显示关闭按钮, 默认 false
 *
 * @example
 * <Modal
 *     // 图标
 *     icon='info-circle'
 *     iconColor='#8e8c8c36'
 *     iconSize={20}
 *
 *     // 标题
 *     title='Modal 标题'
 *     titleTextSize={20}
 *     titleTextColor='#858585'
 *     titleBgColor='#ffffff'
 *
 *     // 副标题
 *     subTitle='Modal 副标题!'
 *     subTitleTextSize={20}
 *     subTitleTextColor='#5c89e4'
 *
 *     // 内容
 *     content='Modal 内容区域内容区域内容区域内容区域内容区域'
 *     contentTextSize={20}
 *     contentTextColor='#acacac'
 *
 *     // 确认按钮
 *     confirmText='确认'
 *     confirmBtnTextColor='#5c89e4'
 *     confirmBtnBgColor='#FFFFFF'
 *
 *     // 取消按钮
 *     cancelText='取消'
 *     cancelBtnTextColor='#acacac'
 *     cancelBtnBgColor='#ffffff'
 *
 *     // 回调函数
 *     onConfirm={this.onConfirmModal}
 *     onCancel={this.onCancelModal}
 *
 *     // 是否显示关闭按钮
 *     closeBtn
 *     >
 *        <Text>内容区域</Text>
 *        <Input type='text' placeholder='将会获取焦点' focus />
 *     </Modal>
 */
export interface ModalProps {
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

  // 是否显示关闭按钮
  closeBtn?: boolean

  // 回调函数
  onConfirm?(): void,

  onCancel?(): void
}

declare const Modal: ComponentClass<ModalProps>;

export default Modal
