/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-5-14
 * Time: 下午5:22
 * Desc:
 */
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {Badge, List, SwipeAction, Modal, Toast, Button, DatePicker, WingBlank, Checkbox, Tag} from "antd-mobile";
import RNModal from "react-native-modal"
import RNMultiplePicker from "../component/RNMultiplePicker";
import moment from 'moment'

moment.locale('zh-cn')

console.log(moment.weekdaysShort())

const Item = List.Item

@connect(
    state => ({}),
    dispatch => ({})
)
export class AdminView extends Component {
    static propTypes = {};

    initModel = {
        raceDate: null,
        startTime: null,
        endTime: null,
        gameType: '单打',
        userList: [],
        isVisible: false,
        loading: false
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allUserList: [],
            ...this.initModel
        };
        this.getData()
        this.getAllUser()
    }

    async getAllUser() {
        let {object} = await HTTP.get(`findAllUser`)
        if (object) {
            object = object.map(({userName, id}) => ({name: userName, id}))
        } else {
            object = []
        }
        this.setState({allUserList: object})
    }

    async getData() {
        try {
            const {success, object, message} = await HTTP.get(`findAllExaminationArrange`)
            if (!success) {
                throw message
            }
            console.log('查询结果', object)
            this.setState({data: object})
        } catch (err) {
            Toast.fail('查询失败:' + err)
        }
    }

    async updateResult(item, result) {
        if (!item || !result) {
            Toast.fail('录入失败,比赛结果不能为空');
            return;
        }
        const {success, message} = await HTTP.postJson(`addExaminationArrange`, {...item, gameResult: result})
        if (!success) {
            Toast.fail('录入失败:' + message)
            return
        }
        await this.getData()
    }

    appendResult(item) {
        Modal.prompt(
            '录入比赛结果',
            '输入比赛结果',
            (result) => this.updateResult(item, result),
            null,
            '',
        );
    }

    async saveRace() {
        try {
            const {raceDate, startTime, endTime, gameType, userList} = this.state
            if (gameType === '单打' && userList.length !== 2) {
                throw '单打参赛人员必须为2个'
            }
            if (gameType === '双打' && userList.length !== 4) {
                throw '双打参赛人员必须为4个'
            }
            this.setState({loading: true})
            const {success, message} = await HTTP.postJson(`addExaminationArrange`, {
                attribute1: moment(raceDate).format('YYYY-MM-DD'),
                startTime: moment(startTime).format('HH:mm'),
                endTime: moment(endTime).format('HH:mm'),
                gameType,
                userList: userList.map(({name}) => name).join(','),
                createTime: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            console.log('保存结果', success, message)
            if (!success) {
                throw message
            }
            this.close()
            await this.getData()
        } catch (e) {
            this.close()
            Toast.fail('添加失败:' + e)
        }
    }

    close() {
        this.setState({
            ...this.initModel
        })
    }

    render() {

        console.log('管理员数据', this.state)

        const right = (item) => [
            {
                text: '录入结果',
                onPress: () => this.appendResult(item),
                style: {backgroundColor: 'cornflowerblue', color: 'white'},
            },
        ];

        const {raceDate, startTime, endTime, gameType, userList, loading} = this.state

        const disabled = !raceDate || !startTime || !endTime || !gameType || !userList

        return (
            <View style={{flex: 1}}>
                <List renderHeader={(
                    <Button type="primary" style={{borderRadius: 0}} onClick={_ => this.setState({isVisible: true})}>
                        添加比赛
                    </Button>
                )}>
                    {this.state.data.map(item => (
                        <SwipeAction
                            autoClose
                            style={{backgroundColor: 'transparent'}}
                            right={!!item.gameResult ? [] : right(item)}
                            onOpen={() => console.log('open')}
                            onClose={() => console.log('close')}
                        >
                            <RaceItem item={item}/>
                        </SwipeAction>
                    ))}
                </List>
                <RNModal
                    isVisible={this.state.isVisible}
                    style={{
                        marginHorizontal: 30,
                        marginVertical: 50,
                        backgroundColor: '#fff',
                        justifyContent: 'flex-start'
                    }}
                    onRequestClose={_ => this.close()}
                >
                    <List renderHeader={'录入比赛'}
                          renderFooter={(
                              <WingBlank
                                  style={{
                                      marginTop: 20,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                  }}
                              >
                                  <Button type="ghost" disabled={disabled || loading} loading={loading}
                                          style={{flex: 1}}
                                          onClick={_ => this.saveRace()}>保存</Button>
                                  <Button type="ghost" style={{flex: 1}} onClick={_ => this.close()}>关闭</Button>
                              </WingBlank>
                          )}
                    >
                        <DatePicker
                            defaultDate={new Date()}
                            value={this.state.raceDate}
                            placeholder="请输入比赛日期"
                            mode="date"
                            onChange={raceDate => this.setState({raceDate})}
                            format="YYYY-MM-DD"
                        >
                            <List.Item arrow="horizontal">比赛日期</List.Item>
                        </DatePicker>
                        <DatePicker
                            value={this.state.startTime}
                            placeholder="请输入开始时间"
                            mode="time"
                            onChange={startTime => this.setState({startTime})}
                            format="HH:mm"
                        >
                            <List.Item arrow="horizontal">开始时间</List.Item>
                        </DatePicker>
                        <DatePicker
                            value={this.state.endTime}
                            placeholder="请输入结束时间"
                            mode="time"
                            onChange={endTime => this.setState({endTime})}
                            format="HH:mm"
                        >
                            <List.Item arrow="horizontal">结束时间</List.Item>
                        </DatePicker>
                        <List.Item extra={(
                            <Checkbox checked={this.state.gameType === '单打'}
                                      onChange={value => value && this.setState({gameType: '单打'})}/>
                        )}>
                            单打
                        </List.Item>
                        <List.Item extra={(
                            <Checkbox checked={this.state.gameType === '双打'}
                                      onChange={value => value && this.setState({gameType: '双打'})}/>
                        )}>
                            双打
                        </List.Item>
                        <List.Item extra={(
                            <RNMultiplePicker
                                data={this.state.allUserList}
                                primaryField={'id'}
                                displayField={'name'}
                                placeholder={'请选择'}
                                selectedValues={this.state.userList}
                                renderItem={(item) => <Text>{item.name}</Text>}
                                onConfirm={userList => this.setState({userList})}
                            />
                        )}>
                            参赛人员
                        </List.Item>
                    </List>
                </RNModal>
            </View>
        );
    }
}

export function RaceItem({item}) {
    const {id, attribute1, startTime, endTime, gameType, userList, gameResult, createTime} = item || {}
    return (
        <Item key={id}>
            <View>
                <Text>比赛日期: {attribute1}</Text>
                <Text>比赛时间: {startTime} - {endTime}</Text>
                <Tag>{gameType}</Tag>
                <Text>参赛人: {userList}</Text>
                {gameResult && (
                    <Text>比赛结果: {gameResult}</Text>
                )}
                <Text>创建时间: {createTime}</Text>
            </View>
        </Item>
    )
}


const styles = StyleSheet.create();
