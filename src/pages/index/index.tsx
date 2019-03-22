import Taro, {Component, Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
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
              icon='info-circle'
              iconColor='#cf65ff'
              title='Modal 标题'
              subTitle='Modal 副标题!'
              content='Modal 内容区域内容区域'
              confirmText='确认'
              cancelText='取消'
              titleColor='#aaaaaa'
              titleBgColor='#ffffff'
              btnGroupsTopBorderColor='#cecece'
              cancelBtnColor='red'
              cancelBtnBgColor='blue'
              confirmBtnColor='grey'
              confirmBtnBgColor='green'
              onConfirm={this.onConfirmModal}
              onCancel={this.onCancelModal}
            />
          )
        }
      </View>
    );
  }
}

