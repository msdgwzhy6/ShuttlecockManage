/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午9:36
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {REGIST_REQUEST} from "../redux/reducers/register";
import {Button, InputItem, List, Toast} from "antd-mobile";

@connect(
  state => ({
    loading: state.register.loading
  }),
  dispatch => ({
    regist: bindActionCreators(REGIST_REQUEST, dispatch)
  })
)
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rePassword: '',

      usernameError: null,
      passwordError: null,
      rePasswordError: null,
    };
  }

  handleRegist() {
    const {username, password} = this.state;
    const usernameValid = this.validateUsername()
    const passwordValid = this.validatePassword()
    const rePasswordValid = this.validateRePassword()
    if (usernameValid && passwordValid && rePasswordValid) {
      this.props.regist(username, password);
    }
  }

  validateUsername() {
    const {username} = this.state
    if (username.length === 0) {
      this.setState({usernameError: '用户名不能为空'})
      return false;
    }
    return true
  }

  validatePassword() {
    const {password} = this.state
    if (password.length < 6) {
      this.setState({passwordError: '密码至少为6位'})
      return false;
    }
    return true
  }

  validateRePassword() {
    const {password, rePassword} = this.state
    if (password !== rePassword) {
      this.setState({rePasswordError: '两次密码输入不一致'})
      return false;
    }
    return true
  }

  changeParams(params) {
    this.setState({
      ...params,
      usernameError: null,
      passwordError: null,
      rePasswordError: null,
    })
  }

  render() {
    const {loading} = this.props;
    const {
      username, password, rePassword,
      usernameError, passwordError, rePasswordError
    } = this.state;

    return (
      <View style={styles.container}>
        <List>
          <InputItem
            clear
            error={usernameError}
            onErrorClick={_ => Toast.fail(usernameError)}
            value={username}
            onChange={(username) => {
              this.changeParams({username})
            }}
            placeholder="用户名"
          >
            用户名
          </InputItem>
          <InputItem
            type="password"
            error={passwordError}
            onErrorClick={_ => Toast.fail(passwordError)}
            value={password}
            onChange={(password: any) => {
              this.changeParams({password});
            }}
            placeholder="密码"
          >
            密码
          </InputItem>
          <InputItem
            type="password"
            error={rePasswordError}
            onErrorClick={_ => Toast.fail(rePasswordError)}
            value={rePassword}
            onChange={(rePassword: any) => {
              this.changeParams({rePassword});
            }}
            placeholder="重复密码"
          >
            重复密码
          </InputItem>
        </List>
        <Button style={{marginTop: 50}}
                loading={loading}
                disabled={loading}
                onClick={_ => this.handleRegist()}>
          注册
        </Button>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});
