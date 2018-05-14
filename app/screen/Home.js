/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-30
 * Time: 下午5:55
 * Desc:
 */
import React, {Component} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {LOGOUT_REQUEST} from "../redux/reducers/login";
import HeaderRightIcon from "../component/HeaderRightIcon";
import {Confirm} from "../component/Confirm";
import {AdminView} from "./AdminView";
import {Container, Content} from "native-base/src"
import {UserView} from "./UserView";

@connect(
  state => ({
    user: state.login.user
  }),
  dispatch => ({
    logout: bindActionCreators(LOGOUT_REQUEST, dispatch)
  })
)
export class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {logout} = navigation.state.params || {}
    return {
      headerRight: (<HeaderRightIcon icon={'power-off'} iconColor={'#fff'} onPress={logout}/>)
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.navigation.setParams({logout: this.logout})
  }

  logout = () => {
    Confirm('提示', '确定退出登录吗', [
      {text: '否', style: 'cancel'},
      {text: '是', onPress: () => this.props.logout()},
    ])
  }

  render() {
    const {userName} = this.props.user || {}
    console.log('当前用户', userName)
    return (
      <Container >
        <Content style={styles.container}>
            {userName === 'admin' ? (
                <AdminView/>
            ) : (<UserView userName={userName}/>)}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
