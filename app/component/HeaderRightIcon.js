/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-1-7
 * Time: 下午5:13
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * 导航栏右侧的按钮封装
 */
export default class HeaderRightIcon extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    text: PropTypes.string,
    textStyle: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    iconColor: '#333'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {style, onPress, icon, iconColor, text, textStyle, disabled} = this.props;
    if (disabled) {
      textStyle = {
        ...textStyle,
        color: 'disabledColor'
      };
      onPress = _ => {
      }
    }
    return (
      <TouchableOpacity disabled={disabled} style={[styles.container, style]} onPress={onPress}>
        {text && (
          <Text style={[styles.text, textStyle]}>{text}</Text>
        )}
        {icon && (
          <Icon name={icon}
                style={{backgroundColor: 'transparent'}}
                color={iconColor} size={20}/>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2
  },
  text: {
    fontSize: 14,
    color: '#3366FF',
    backgroundColor: 'transparent'
  },
});
