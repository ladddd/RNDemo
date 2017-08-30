/**
 * Created by 陈伟达 on 2017/8/29.
 */
import MediaPage from '../container/MediaPage'
import OrderPage from '../container/OrderPage'
import MessagePage from '../container/MessagePage'
import UserPage from '../container/UserPage'
import React, {Component} from 'react'
import { Platform, Image, StyleSheet } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { px2dp } from '../utils/dimenUtils'
import theme from '../constants/theme'
import * as Actions from '../actions/TabActions'

class BottomTabBar extends Component {

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon){
        const {navigator, tabIconColor} = this.props;
        const { selectedTab } = this.props.tab;
        return(
            <TabNavigator.Item
                selected={selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color: tabIconColor}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
                renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon, {tintColor: tabIconColor}]} source={selectedIcon} />}
                onPress={() => this.props.actions.setSelected(tab)}>
                {<Component navigator={navigator}/>}
            </TabNavigator.Item>
        );
    }

    render() {
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabBarStyle, {backgroundColor: 'white'}]} //TODO 接入主题管理后再配置颜色属性
                sceneStyle={{
                    paddingTop: theme.toolbar.paddingTop, //沉浸式
                    paddingBottom: styles.tabBarStyle.height}}>
                {this._renderItem(MediaPage, 'Home', '媒体排期', require('../images/media.png'), require('../images/media_selected.png'))}
                {this._renderItem(OrderPage, 'Profile', '订单', require('../images/bill.png'), require('../images/bill_selected.png'))}
                {this._renderItem(MessagePage, 'List', '消息中心', require('../images/message.png'), require('../images/message_selected.png'))}
                {this._renderItem(UserPage, 'Flex', '我的', require('../images/user.png'), require('../images/user_selected.png'))}
            </TabNavigator>
        )
    }
}

const styles = StyleSheet.create({
    tabBarItemIcon: {
        width: px2dp(20),
        height: px2dp(20)
    },
    tabBarStyle: {
        height: px2dp(45),
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
    }
});

const mapStateToProps = (state) => ({
    tab: state.tabReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabBar);