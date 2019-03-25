import { ComponentClass } from 'react'

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

  // 回调函数
  onConfirm?(): void,

  onCancel?(): void
}

declare const Modal: ComponentClass<ModalProps>;

export default Modal
