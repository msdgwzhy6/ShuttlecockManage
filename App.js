/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './app/utils/Globar';

import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {Provider} from "react-redux";
import store from "./app/redux/store";
import AppWithNavigationState from "./app/routes/AppWithNavigationState";

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
});
