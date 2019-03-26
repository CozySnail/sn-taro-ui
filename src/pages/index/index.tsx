import Taro, {Component, Config} from '@tarojs/taro';
import {Input, Text, View} from '@tarojs/components';
import './index.scss';

import Modal from '../../components/modal/modal';

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  state = {
    modalShow: true,
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onConfirmModal = () => {
    this.setState({modalShow: false});
  };


  onCancelModal = () => {
    this.setState({modalShow: false});
  };

  render() {
    return (
      <View className='index'>
        {
          this.state.modalShow && (
            <Modal
              // 图标
              icon='info-circle'
              iconColor='#8e8c8c36'
              iconSize={20}

              // 标题
              title='Modal 标题'
              titleTextSize={20}
              titleTextColor='#858585'
              titleBgColor='#ffffff'

              // 副标题
              subTitle='Modal 副标题!'
              subTitleTextSize={20}
              subTitleTextColor='#5c89e4'

              // 内容
              content='Modal 内容区域内容区域内容区域内容区域内容区域'
              contentTextSize={20}
              contentTextColor='#acacac'

              // 确认按钮
              confirmText='确认'
              confirmBtnTextColor='#5c89e4'
              confirmBtnBgColor='#FFFFFF'

              // 取消按钮
              cancelText='取消'
              cancelBtnTextColor='#acacac'
              cancelBtnBgColor='#ffffff'

              // 回调函数
              onConfirm={this.onConfirmModal}
              onCancel={this.onCancelModal}

              closeBtn
            >
              <Text>内容区域</Text>
              <Input type='text' placeholder='将会获取焦点' focus />
            </Modal>
          )
        }
      </View>
    );
  }
}

