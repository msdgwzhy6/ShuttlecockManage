/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午3:00
 * Desc: react-navigation 整合 redux
 */
import React, {Component} from 'react';
import {addNavigationHelpers, NavigationActions} from "react-navigation";
import {connect} from "react-redux";
import AppRouter from "./routesBuilder";
import {
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import {BackHandler} from "react-native";

const addListener = createReduxBoundAddListener("Login");

@connect(state => ({
  nav: state.nav
}))
export default class AppWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    return (
      <AppRouter navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener
      })} />
    );
  }
}