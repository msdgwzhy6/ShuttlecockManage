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
import {Button, Icon, Input} from "react-native-elements";
import {REGIST_REQUEST} from "../redux/reducers/authorize";

@connect(
  state => ({
    authorize: state.authorize,
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

      usernameValid: true,
      passwordValid: true
    };
  }

  handleRegist() {
    NavUtils.navTo('Home');
    // const {username, password} = this.state;
    // const usernameValid = this.validateUsername()
    // const passwordValid = this.validatePassword()
    // if (usernameValid && passwordValid) {
    //   this.props.regist(username, password);
    // }
  }

  validateUsername() {
    const {username} = this.state
    const usernameValid = username.length > 0
    this.setState({usernameValid})
    usernameValid || this.usernameInput.shake()
    return usernameValid
  }

  validatePassword() {
    const {password} = this.state
    const passwordValid = password.length >= 6
    this.setState({passwordValid})
    passwordValid || this.passwordInput.shake()
    return passwordValid
  }

  render() {
    const {registering, failReason} = this.props.authorize;
    const {usernameValid, passwordValid} = this.state;

    return (
      <View style={styles.container}>
        {failReason && <Text>用户名已被占用</Text>}
        <Input
          ref={usernameInput => this.usernameInput = usernameInput}
          errorMessage={'用户名不能为空'}
          displayError={!usernameValid}
          placeholder={'用户名'}
          onChangeText={username => this.setState({username})}
        />
        <Input
          ref={passwordInput => this.passwordInput = passwordInput}
          errorMessage={'密码至少为6位'}
          displayError={!passwordValid}
          placeholder={'密码'}
          secureTextEntry
          onChangeText={password => this.setState({password})}
        />
        <Button
          title={'注册'}
          loading={registering}
          onPress={_ => this.handleRegist()}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
