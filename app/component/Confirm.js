/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-15
 * Time: 下午5:56
 * Desc:
 */
import React, {Component} from "react";
import {Platform, Alert} from "react-native";
import {Modal} from "antd-mobile";

/**
 * 确认框 取消在左 确定在右
 * @param title
 * @param message
 * @param actions
 * @constructor
 */
export function Confirm(title = '提示', message, actions) {
  if (Platform.OS === 'ios') {
    Alert.alert(title, message, actions)
  } else if (Platform.OS === 'android') {
    Modal.alert(title, message, actions);
  }
}