/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-30
 * Time: 下午6:20
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

@connect(
  state => ({}),
  dispatch => ({})
)
export class TestComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Text>{this.props.text}</Text>
    );
  }
}

const styles = StyleSheet.create();
