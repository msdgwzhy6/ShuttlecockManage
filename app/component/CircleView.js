/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-11
 * Time: 上午11:34
 * Desc: 圆圈
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export function CircleView({
  type, size, color, borderWidth, centerColor
                           }) {
  log(type, size, color, borderWidth, centerColor)
  let style = {};
  if (type === 'solid') {
    style.backgroundColor = color
  } else if (type === 'hollow') {
    style.borderColor = color
    style.borderWidth = borderWidth
    style.backgroundColor = centerColor
  }
  return (
    <View style={{
      height: size,
      width: size,
      borderRadius: size/2,
      marginHorizontal: 3,
      ...style
    }}/>
  )
}

CircleView.propTypes = {
  type: PropTypes.oneOf(['hollow', 'solid']),
  ...HollowCircle.propTypes
}

/**
 * 实心圆
 * @param size
 * @param color
 * @returns {XML}
 * @constructor
 */
export function SolidCircle(props) {
  return (
    <CircleView {...props} type={'solid'}/>
  )
}

SolidCircle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

SolidCircle.defaultProps = {
  size: 10,
  color: '#000',
}

/**
 * 空心圆
 * @returns {XML}
 * @constructor
 */
export function HollowCircle(props) {
  return (
    <CircleView {...props} type={'hollow'}/>
  )
}

HollowCircle.propTypes = {
  borderWidth: PropTypes.number,
  centerColor: PropTypes.string,
  ...SolidCircle.propTypes
}

HollowCircle.defaultProps = {
  borderWidth: 2,
  centerColor: '#fff',
  ...SolidCircle.defaultProps
}
