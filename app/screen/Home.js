/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-30
 * Time: 下午5:55
 * Desc:
 */
import React, {Component} from "react";
import {Button, StyleSheet, Text} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

@connect(
  state => ({}),
  dispatch => ({})
)
export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button title={'Regist'}
              onPress={_ => this.props.navigation.navigate('Register')}
      />
    );
  }
}

const styles = StyleSheet.create();
