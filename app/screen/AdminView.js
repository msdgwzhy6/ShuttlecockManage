/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-5-14
 * Time: 下午5:22
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Badge, List, SwipeAction, Modal, Toast, Button, DatePicker, WingBlank} from "antd-mobile";
import RNModal from "react-native-modal"
import RNMultiplePicker from "../component/RNMultiplePicker";
import moment from 'moment'

const Item = List.Item

@connect(
  state => ({}),
  dispatch => ({})
)
export class AdminView extends Component {
  static propTypes = {};

  initModel = {
    raceDate: null,
    startTime: null,
    endTime: null,
    gameType: '单打',
    userList: [],
    isVisible: false
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allUserList: [{
        name: '张三',
        id: 1
      }, {
        name: '李四',
        id: 2
      }],
      ...this.initModel
    };
  }

  async getData() {
    try {
      const {success, data, message} = await HTTP.get(``)
      if (!success) {
        throw message
      }
      this.setState({data})
    } catch (err) {
      Toast.fail('查询失败:' + err)
    }
  }

  async updateResult(id, result) {
    if (!id || !result) {
      Toast.fail('录入失败,比赛结果不能为空');
      return;
    }
    const {success, message} = await HTTP.putJson(``, {result: result})
    if (!success) {
      Toast.fail('录入失败:' + message)
      return
    }
    await this.getData()
  }

  appendResult(item) {
    Modal.prompt(
      '录入比赛结果',
      '输入比赛结果',
      (result) => this.updateResult(item.id, result),
      null,
      '',
    );
  }

  saveRace() {

  }

  close() {
    this.setState({
      ...this.initModel
    })
  }

  render() {
    const right = (item) => [
      {
        text: '录入结果',
        onPress: () => this.appendResult(item),
        style: {backgroundColor: 'cornflowerblue', color: 'white'},
      },
    ];

    return (
      <View style={{flex: 1}}>
        <List renderHeader={(
          <Button type="primary" style={{borderRadius: 0}} onClick={_ => this.setState({isVisible: true})}>
            添加比赛
          </Button>
        )}>
          {[1, 2, 3].map(item => (
            <SwipeAction
              autoClose
              style={{backgroundColor: 'transparent'}}
              right={right(item)}
              onOpen={() => console.log('open')}
              onClose={() => console.log('close')}
            >
              <RaceItem item={item}/>
            </SwipeAction>
          ))}
        </List>
        <RNModal
          isVisible={this.state.isVisible}
          style={{
            marginHorizontal: 30,
            marginVertical: 50,
            backgroundColor: '#fff',
            justifyContent: 'flex-start'
          }}
          onRequestClose={_ => this.close()}
        >
          <List renderHeader={'录入比赛'}
                renderFooter={(
                  <WingBlank
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Button type="ghost" disabled style={{flex: 1}} onClick={_ => this.saveRace()}>保存</Button>
                    <Button type="ghost" style={{flex: 1}} onClick={_ => this.close()}>关闭</Button>
                  </WingBlank>
                )}
          >
            <DatePicker
              defaultDate={new Date()}
              value={this.state.raceDate}
              placeholder="请输入比赛日期"
              mode="date"
              onChange={raceDate => this.setState({raceDate})}
              format="YYYY-MM-DD"
            >
              <List.Item arrow="horizontal">比赛日期</List.Item>
            </DatePicker>
            <DatePicker
              value={this.state.startTime}
              placeholder="请输入开始时间"
              mode="time"
              onChange={startTime => this.setState({startTime})}
              format="HH:mm"
            >
              <List.Item arrow="horizontal">开始时间</List.Item>
            </DatePicker>
            <DatePicker
              value={this.state.endTime}
              placeholder="请输入结束时间"
              mode="time"
              onChange={endTime => this.setState({endTime})}
              format="HH:mm"
            >
              <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
            <List.Item extra={(
              <RNMultiplePicker
                data={this.state.allUserList}
                primaryField={'id'}
                displayField={'name'}
                placeholder={'请选择'}
                selectedValues={this.state.userList}
                renderItem={(item) => <Text>{item.name}</Text>}
              />
            )}>
              参赛人员
            </List.Item>
          </List>
        </RNModal>
      </View>
    );
  }
}

export function RaceItem({item}) {
  const {id, raceDate, startTime, endTime, gameType, userList, createTime} = item || {}
  return (
    <Item key={id}>
      <View>
        <Text>比赛日期: 2018-02-03(周三)</Text>
        <Text>比赛时间: 20:00 - 21:00</Text>
        <Badge value={'单打'}/>
        <Text>参赛人: 张三，李四</Text>
      </View>
    </Item>
  )
}


const styles = StyleSheet.create();
