/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午9:36
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Button, Icon, Input} from "react-native-elements";

@connect(
  state => ({}),
  dispatch => ({})
)
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,

      usernameValid: true,
      passwordValid: true
    };
  }

  handleLogin() {
    NavUtils.navTo('Home');

    const usernameValid = this.validateUsername()
    const passwordValid = this.validatePassword()
    if (usernameValid && passwordValid) {
      this.setState({isLoading: true})
      setTimeout(() => {
        this.setState({isLoading: false})
      }, 1500)
    }
  }

  validateUsername() {
    const {username} = this.state
    const usernameValid = username.length > 6
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
    const {
      isLoading, username, password,
      usernameValid, passwordValid
    } = this.state;

    return (
      <View style={styles.container}>
        <Input
          ref={usernameInput => this.usernameInput = usernameInput}
          errorMessage={'用户名不能为空'}
          displayError={!usernameValid}
          placeholder={'用户名'}
          onValueChange={username => this.setState({username})}
        />
        <Input
          ref={passwordInput => this.passwordInput = passwordInput}
          errorMessage={'密码至少为6位'}
          displayError={!passwordValid}
          placeholder={'密码'}
          secureTextEntry
          onValueChange={password => this.setState({password})}
        />
        <Button
          title={'登录'}
          loading={isLoading}
          onPress={_ => this.handleLogin()}
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
