import Taro, {Component, Config} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import './index.scss';

import Container from '../../components/container/container';

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

  state = {};

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

  render() {
    const footer = (
      <View>
        <Text>底部1</Text>
        <Text>底部2</Text>
      </View>
    );

    return (
      <Container
        // 背景颜色
        bgColor='#ffffff'

        // 标题
        titleHeight={100}
        title='这里是标题'  // 标题内容
        titleTextColor='#1E242A' // 文字颜色
        titleTextSize={50}  // 文字大小

        // 返回按钮
        backText='返回' // 返回按钮文字
        backTextColor='#5c89e4'  // 返回按钮文字颜色
        backTextSize={30} // 返回按钮文字大小
        backIconColor='#5c89e4' // 返回图标颜色

        // 是否显示返回按钮
        showBack

        // 背景颜色
        middleBgColor='#acacac'

        footHeight={100}
        footBgColor='#dedede'
        footer={footer}
      >
        <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
        <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
      </Container>
    );
  }
}

