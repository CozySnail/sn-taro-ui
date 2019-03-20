import Taro, {Component, Config} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import './index.scss';

import Timer from '../../components/timer/timer';
// import SnCheckEnv from '../../utils/SnCheckEnv';
// import SnLogUtil from '../../utils/SnLogUtil';
// import SnStorage from '../../utils/SnStorage';
import SignUtil from '../../utils/network/SignUtil';

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
    time: 0,
    timeup: '',
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 20000
  };

  componentWillMount() {
  }

  componentDidMount() {
    /*
    // 测试 SnCheckEnv 工具类
    console.log('SnCheckEnv isPC : ', SnCheckEnv.isPC());
    console.log('SnCheckEnv isWeb : ', SnCheckEnv.isWeb());
    console.log('SnCheckEnv isWeApp : ', SnCheckEnv.isWeApp());
    console.log('SnCheckEnv isAlipay : ', SnCheckEnv.isAlipay());
    console.log('SnCheckEnv isSwan : ', SnCheckEnv.isSwan());
    console.log('SnCheckEnv isRN : ', SnCheckEnv.isRN());
    console.log('SnCheckEnv isTT : ', SnCheckEnv.isTT());
    console.log('SnCheckEnv isWeChatMiniProgram : ', SnCheckEnv.isWeChatMiniProgram());
    console.log('SnCheckEnv isWeChatPublic : ', SnCheckEnv.isWeChatPublic());*/
    /*// 测试 SnLogUtil 工具类
    SnLogUtil.logError('name 1 ', 'action 2', {name:'张三', age: 12, gender: '男'});*/

    // 测试 SnStorage 工具类

    // 测试 SignUtil 工具类
    console.log('sign : ', SignUtil.genEncryptedSecret( 'JZPAYWX22846','MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDz1TEIAjzVD0kkbhqjIvTteHgT59sGxcQqiLmh1B40X8LcQQNlFfG1laC2NxSXWADiT8RGaD1Y+woVLgRsP0qDv7pBRzt5fUA2+MRnq30WzU6n/xmEAeP/ZcLVtQQZVP/KVMVhE/McDve9ITI+Eojuh3csB1ILvUt0wJ3RYJEfUwIDAQAB'));
    console.log('sign : ', SignUtil.decryptForEncryptedSecret('JZPAYWX22846', 'U2FsdGVkX19DRCi80liAzvA4eN6aAZM6JW+BPPDDlJSLuLBnQ3w8c5M689Hnz54KHo8OypGdFZ8N69qX7zrtHPJvPHFW7zPej6NnmVne3RPvivXPaQcC4M4VVKir/QXlcP7d1CBcChnsgqq2UsOAdVtvKvlKLQfoMX2Y3XRfmceBn2u8Graj7Do7XMxC+JCJryiRogOjRqOpKqYGqu0lQXVUHZBxyyWQFIcoS96xDd6bpOKTFOb7MGUZER6CNn3e6Tiz2dJQoSxwz2uOQ5Zg249JwJCq0KBFg1Lan55JpJNnzC2Ltz9tHoDRASY+YAvG'));

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  tickHandler = (time) => {
    this.setState({time});
  };

  timeupHandler = (timeup) => {
    this.setState({timeup});
  };

  render() {
    const {startTime, endTime, time, timeup} = this.state;

    return (
      <View className='index'>
        <Text>Hello world! {time} {timeup} </Text>
        <Text>{startTime}</Text>
        <Text>{endTime}</Text>
        <Timer
          startTime={startTime}
          endTime={endTime}
          onTick={this.tickHandler}
          onTimeup={this.timeupHandler.bind(this)}
        />
      </View>
    );
  }
}

