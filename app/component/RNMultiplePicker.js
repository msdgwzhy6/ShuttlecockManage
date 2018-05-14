/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 17-12-24
 * Time: 上午9:59
 * Desc: RN多选下拉组件
 */
import React, {Component} from "react";
import {ListView, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Container, Content, Header, Button, Body, Title, ListItem, CheckBox} from "native-base/src";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * TODO 修改选中事件为子组件内部事件
 */
export default class RNMultiplePicker extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        title: PropTypes.string,

        primaryField: PropTypes.string,
        displayField: PropTypes.string,

        data: PropTypes.array,
        selectedValues: PropTypes.array,
        isSimpleArray: PropTypes.bool,

        backBtnText: PropTypes.string,
        confirmBtnText: PropTypes.string,

        onClose: PropTypes.func,
        onConfirm: PropTypes.func,

        containerStyle: PropTypes.object,
        headerStyle: PropTypes.object,
        backBtnStyle: PropTypes.object,
        titleStyle: PropTypes.object,
        confirmBtnStyle: PropTypes.object,
        itemStyle: PropTypes.object,

        renderItem: PropTypes.func,
        renderArrowIcon: PropTypes.func
    };

    static defaultProps = {
        placeholder: '请选择',
        title: '请选择',

        primaryField: 'id',
        displayField: 'text',

        selectedValues: [],

        backBtnText: '返回',
        confirmBtnText: '确定'
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        this.ds = ds;
        this.state = {
            modalVisible: false,
            values: null,
            mData: [],
            dataSource: ds.cloneWithRows([])
        };
    }

    componentWillMount() {
        this.setState(this.buildValue());
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.buildValue(nextProps.selectedValues));
    }

    /**
     * 构造显示值
     */
    buildValue(selectedValues = this.props.selectedValues) {
        const {displayField, isSimpleArray} = this.props;
        let values = [];
        if (isSimpleArray) {
            selectedValues && selectedValues.forEach(val => values.push(val));
            return {values: values.join(',')};
        }
        //TODO 目前为直接在selectedValues中取值显示 是否需要修改为当显示值不存在时遍历data取值?
        selectedValues && selectedValues.forEach(val => values.push(val[displayField]));
        return {values: values.join(',')};
    }

    /**
     * 将元数据转换为UI可使用的格式
     * @returns
     */
    formatData(isSimpleArray = this.props.isSimpleArray) {
        let mData = [], primaryValues = [];
        const {data, selectedValues, primaryField} = this.props;
        if (isSimpleArray) {
            data && data.forEach(item => mData.push({
                text: item,
                checked: selectedValues.indexOf(item) !== -1
            }));
            return {mData, dataSource: this.ds.cloneWithRows(mData)};
        }
        selectedValues && selectedValues.forEach(val => primaryValues.push(val[primaryField]));
        data && data.forEach(item => mData.push({
            ...item,
            checked: primaryValues.indexOf(item[primaryField]) !== -1
        }));
        return {mData, dataSource: this.ds.cloneWithRows(mData)};
    }

    /**
     * 获取已选中的项
     * @returns {Array.<T>}
     * @private
     */
    _getSelectValues(isSimpleArray = this.props.isSimpleArray) {
        const {mData} = this.state;
        if (isSimpleArray) {
            let selectedValues = [];
            mData.forEach(item => item.checked && selectedValues.push(item.text));
            return selectedValues;
        }
        return mData.filter(item => item.checked);
    }

    open() {
        this.setState({
            modalVisible: true,
            ...this.formatData(),
        })
    }

    close() {
        this.props.onClose && this.props.onClose();
        this.setState({
            modalVisible: false,
            ...this.formatData()
        })
    }

    confirm() {
        this.close();
        this.props.onConfirm && this.props.onConfirm(this._getSelectValues());
    }

    renderBody() {
        const {placeholder, containerStyle, renderArrowIcon} = this.props;
        const {values} = this.state;
        return (
            <TouchableOpacity style={{flex: 1}} activeOpacity={0.6} onPress={this.open.bind(this)}>
                <View style={[styles.body, containerStyle]}>
                    {values ? <Text style={{width: '90%', color: '#333'}} numberOfLines={1}>{values}</Text> :
                        <Text style={{width: '90%', color: '#999'}} numberOfLines={1}>{placeholder}</Text>}
                    {renderArrowIcon ? renderArrowIcon() : <Icon name='angle-down' size={20}/>}
                </View>
            </TouchableOpacity>
        )
    }

    renderHeader() {
        const {headerStyle, backBtnStyle, titleStyle, confirmBtnStyle} = this.props;
        const {backBtnText, title, confirmBtnText} = this.props;
        return (
            <Header style={[styles.header, headerStyle]}>
                <Button
                    style={backBtnStyle}
                    transparent
                    onPress={this.close.bind(this)}
                >
                    <Text style={{color: '#3450af'}}>{backBtnText} </Text>
                </Button>
                <Body>
                <Title style={[{alignSelf: 'center', color: 'black'}, titleStyle]}> {title} </Title>
                </Body>
                <Button
                    style={confirmBtnStyle}
                    transparent
                    onPress={this.confirm.bind(this)}
                >
                    <Text style={{color: '#3450af'}}> {confirmBtnText} </Text>
                </Button>
            </Header>
        );
    }

    onItemPress = (index) => {
        this.setState((state) => {
            let mData = [...state.mData]; //改变指针列表视图才会重新渲染
            mData[index].checked = !mData[index].checked;
            return {mData, dataSource: this.ds.cloneWithRows(mData)};
        });
    };

    renderItem = (item, sectionID, index, highlightRow) => (
        <ListItem style={styles.item} onPress={() => this.onItemPress(index)}>
            <CheckBox checked={item.checked} onPress={() => this.onItemPress(index)}/>
            <Text style={{marginLeft: 10}}>{item[this.props.displayField]}</Text>
        </ListItem>
    );

    /**
     * 经多次试验 采用ListView比采用FlatList效果好很多
     * @returns {XML}
     */
    render() {
        return (
            <View style={styles.container}>
                {this.renderBody()}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={this.close.bind(this)}
                >
                    <Container>
                        {this.renderHeader()}
                        <Content>
                            <ListView
                                dataSource={this.state.dataSource}
                                initialListSize={20}
                                pageSize={1}
                                renderRow={this.renderItem}
                                keyExtractor={item => item.id}
                            />
                        </Content>
                    </Container>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    header: {
        elevation: 0, //header取消底部阴影效果
        backgroundColor: '#dbdbdb',
    },
    item: {
        height: 50,
        marginLeft: 0,
        paddingLeft: 20
    }
});
