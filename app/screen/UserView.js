/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-5-14
 * Time: 下午5:23
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {List, Toast} from 'antd-mobile'
import {RaceItem} from "./AdminView";

@connect(
    state => ({}),
    dispatch => ({})
)
export class UserView extends Component {
    static propTypes = {
        userName: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        this.getData()
    }

    async getData() {
        const userName = this.props.userName
        try {
            const {success, object, message} = await HTTP.get(`findExaminationArrangeByUserName?userName=${userName}`)
            if (!success) {
                throw message
            }
            this.setState({data: object})
        } catch (err) {
            Toast.fail('查询失败:' + err)
        }
    }

    render() {
        const noBegin = this.state.data.filter(({gameResult}) => !gameResult)
        const complete = this.state.data.filter(({gameResult}) => gameResult)
        return (
            <View>
                <List renderHeader={'未开始'}>
                    {noBegin.map(item => (<RaceItem item={item}/>))}
                </List>
                <List renderHeader={'已完成'}>
                    {complete.map(item => (<RaceItem item={item}/>))}
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create();
