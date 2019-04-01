import Taro, {Component} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import {AtIcon} from 'taro-ui';

import './check.scss';

/**
 * @Description: checkbox组件
 * @author MeSKiL
 * @date 2019-03-27
 *
 * @param onchange {void} 传递回checkbox的参数，当checkbox发生变化时调用
 *
 * @param defaultChecked {boolean} checkbox初始是否被选中 默认状态为 false (传true时，页面初始化时，需要自行获取true。)
 *
 * @param checkboxHeight {any} checkbox的长度 默认值为 23px 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param checkboxWidth {any} checkbox的宽度 默认值为 23px 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param checkboxColor {string} checkbox中 勾的颜色 默认值为 #1AAD19 (勾的颜色)
 *
 * @param checkboxBorderWidth {any} checkbox的边框的宽度 默认值为2px 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param checkboxBorderStyle {string} checkbox的边框样式 默认值为solid
 * @param checkboxBorderColor {string} checkbox的边框颜色 默认值为 #d1d1d1
 * @param checkboxBorderRadius {any} checkbox的边框弧度 默认值为3px 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 *
 * @param iconSize {any} 勾的大小 默认值为 10
 *
 *
 * @param fontSize {any} 字体大小, 默认 23px, 支持 Taro px单位转换, 注意: 该参数在使用时不需要带有 px 单位,仅需传递对应的数值
 * @param content {string} 文字内容 默认值为“你已阅读并同意”
 * @param fontColor {string} 字体颜色 默认值为 black
 *
 *@param clause {any} 协议数组 默认值为 '' 以数组形式传值，内容为对象，对象属性为id(map循环时用作key),name，callback，punctuation，具体传值及使用方法参照example
 *@param clauseColor {any} 协议字体颜色 默认值为 #576b95
 * @example
 *       <Check
 *         onChange={this.onGetChildState.bind(this)}
 *         defaultChecked
 *         checkboxHeight={40}
 *         checkboxWidth={40}
 *         checkboxColor='red'
 *         checkboxBorderWidth={5}
 *         checkboxBorderStyle='dashed'
 *         checkboxBorderColor='blue'
 *         checkboxBorderRadius={5}
 *         iconSize={20} //checkbox长宽相等时 长或宽的一半 为合适大小
 *         fontSize={30}
 *         content='你一定要仔细阅读'
 *         fontColor='red'
 *
 *         clause={[
 *           {'id':1,'name':'《微信协议》','callback':this.weixin,'punctuation':','},
 *           {'id':2,'name':'《支付宝协议》','callback':this.taobao,'punctuation':'及'},
 *           {'id':3,'name':'《百度协议》','callback':this.baidu,'punctuation':'。'}
 *           ]} //this.weixin,this,taobao,this.baidu为点击协议后的回调函数，punctuation为协议后的连接符,id为map时传的key值
 *         clauseColor='green'
 *       />
 */

let itemArray: any = [];

// 设置组件参数属性
interface IProps {

  //必传值
  onChange(checked: boolean): boolean, //获取state中checked的值

  defaultChecked?: boolean, // checkbox初始状态是否被选中

  //checkbox样式
  checkboxHeight?: any, //checkbox长度
  checkboxWidth?: any, //checkbox宽度
  checkboxColor?: string, //checkbox颜色

  //checkbox边框样式
  checkboxBorderWidth?: any, //checkbox边框大小
  checkboxBorderStyle?: string,//checkbox边框样式
  checkboxBorderColor?: string,//checkbox边框颜色
  checkboxBorderRadius?: any,//checkbox边框弧度

  //勾
  iconSize?: any,

  //

  //
  fontSize?: any, // 字体大小
  content?: string, //文字内容
  fontColor?: string, //

  //

  //协议数组
  clause?: any,

  //协议颜色
  clauseColor?: any,

}

// 设置 state 属性
interface IState {
  checked?: boolean,
  clauseObj?: any
}

export default class Check extends Component<IProps, IState> {
  // 设置默认值
  static defaultProps = {

    defaultChecked: false,

    //checkbox样式
    checkboxHeight: 23,
    checkboxWidth: 23,
    checkboxColor: "#1AAD19",


    //checkbox边框样式
    checkboxBorderWidth: 2,
    checkboxBorderColor: '#d1d1d1',
    checkboxBorderStyle: 'solid',
    checkboxBorderRadius: 3,

    //勾
    iconSize: 10,

    //
    fontSize: 23,
    content: '你已阅读并同意',
    fontColor: 'black',

    clause: [],
    //
    clauseColor: '#576b95'
  };
  componentWillMount(): void {
    this.setState({
      checked: this.props.defaultChecked,
    });

    this.props.clause.map((item) => {
      itemArray.push(item);
      this.setState({clauseObj: itemArray})
    });
  }

  onChecked = () => {
    let oldChecked = this.state.checked;
    this.setState({checked: !oldChecked}, () => {
      this.props.onChange(!oldChecked);
    });
  };

  render() {
    return (
      <View className='check-view' style={{fontSize: Taro.pxTransform(this.props.fontSize), display: 'flex', flexWrap: 'wrap'}}>
        <View className='checkbox' onClick={this.onChecked.bind(this)} style={
          {
            height: Taro.pxTransform(this.props.checkboxHeight),
            width: Taro.pxTransform(this.props.checkboxWidth),
            color: this.props.checkboxColor,

            borderRadius: Taro.pxTransform(this.props.checkboxBorderRadius),
            borderWidth: Taro.pxTransform(this.props.checkboxBorderWidth),
            borderStyle: this.props.checkboxBorderStyle,
            borderColor: this.props.checkboxBorderColor,
          }
        }
        >
          {
            this.state.checked && (
              <AtIcon prefixClass='fa' value='check' size={this.props.iconSize} />
            )
          }

        </View>
        <Text style={{color:this.props.fontColor}}>{this.props.content}</Text>
        {
          this.state.clauseObj&&this.state.clauseObj.map((item) => {
            return (
              <View key={item.id}>
                <Text style={{color: this.props.clauseColor}} onClick={() => {item.callback()}}>{item.name}</Text>
                <Text style={{color:this.props.fontColor}}>{item.punctuation}</Text>
              </View>
            )
          })
        }
      </View>
    )

  }
}
