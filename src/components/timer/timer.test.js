/* eslint-disable no-unused-vars */
import React from 'react';
import Taro, {Component} from '@tarojs/taro'
import Nerv, {render} from 'nervjs'
import { View } from '@tarojs/components'
import sinon from 'sinon'

import Timer from '../../../.temp/components/timer/timer'
/* eslint-disable no-undef */
describe('Timer test', () => {
  let scratch;

  beforeEach(() => {
    scratch = document.createElement('div');
    document.body.appendChild(scratch)
  });

  it('Timer test suites', () => {
    class C extends Component {
      constructor () {
        super(...arguments);
        this.state = {
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + 2000
        }
      }

      tickHandler () {

      }

      timeupHandler () {
      }

      render () {
        const { startTime, endTime } = this.state;

        return (
          <View className='index'>
            <Timer startTime={startTime} endTime={endTime} onTick={this.tickHandler} onTimeup={this.timeupHandler} />
          </View>
        )
      }
    }

    const TimerRender = sinon.spy(Timer.prototype, 'render');
    render(<C />, scratch);
    expect(TimerRender.calledOnce).toBeTruthy();
    expect(scratch.innerHTML).toBe('<div class="index"><div class="timer"><span class="taro-text">0:0:2</span></div></div>')
  })
});
