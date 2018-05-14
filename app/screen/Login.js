/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-8
 * Time: 下午4:01
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Button, InputItem, List, Stepper, View} from "antd-mobile";
import {LOGIN_REQUEST} from "../redux/reducers/login";

@connect(
  state => ({
    username: state.login.username,
    loading: state.login.loading
  }),
  dispatch => ({
    login: bindActionCreators(LOGIN_REQUEST, dispatch)
  })
)
export class Login extends Component {
  static navigationOptions = {
    header: null
  }

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      password: ''
    };
  }

  componentWillReceiveProps({username}) {
    if (username) {
      this.setState({username})
    }
  }

  login() {
    const {username, password} = this.state;
    this.props.login(username, password)
  }

  render() {
    const {username, password} = this.state;
    const {loading} = this.props;

    return (
      <View style={styles.container}>
        <List>
          <InputItem
            value={username}
            onChange={(username) => {
              this.setState({username})
            }}
            placeholder="用户名"
          >
            用户名
          </InputItem>
          <InputItem
            type="password"
            value={password}
            onChange={(password) => {
              this.setState({password});
            }}
            placeholder="密码"
          >
            密码
          </InputItem>
        </List>
        <Button style={{marginTop: 50}}
                loading={loading}
                disabled={loading || !username || !password}
                onClick={_ => this.login()}>
          登录
        </Button>
        <View style={styles.otherOption}>
          <TouchableOpacity onPress={_ => NavUtils.navTo('Register')}>
            <Text>注册</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>忘记密码</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  otherOption: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  }
});
