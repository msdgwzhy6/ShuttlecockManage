/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-19
 * Time: 下午4:02
 * Desc:
 */
import React, {Component} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types"
import EmptyDataComponent from "./EmptyDataComponent";

export class CustomFlatList extends Component {
  static propTypes = {
    ...FlatList.propTypes,
    loading: PropTypes.bool,
    end: PropTypes.bool,
  };

  static defaultProps = {
    keyExtractor: (item, index) => (item && item.id || index),
    ListEmptyComponent: <EmptyDataComponent/>,
    onEndReachedThreshold: 0.2
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  footerComponent() {
    const {end, loading} = this.props;
    if (!end && !loading) {
      return;
    }
    return (
      <View style={{height: 40, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {loading && <Text>加载中...</Text>}
        {end && <Text>已经加载全部</Text>}
      </View>
    )
  }

  render() {
    return (
      <FlatList
        {...this.props}
        ListFooterComponent={this.footerComponent()}
      />
    );
  }
}

const styles = StyleSheet.create();
