/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-5-14
 * Time: 下午5:23
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {List, Toast} from 'antd-mobile'
import {RaceItem} from "./AdminView";

@connect(
  state => ({}),
  dispatch => ({})
)
export class UserView extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.getData()
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

  render() {
    const noBegin = []
    const complete = []
    return (
      <View>
        <List renderHeader={'未开始'}>
          {noBegin.map(item => (<RaceItem item={item}/>))}
        </List>
        <List renderHeader={'已完成'}>
          {complete.map(item => (<RaceItem item={item}/>))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create();
