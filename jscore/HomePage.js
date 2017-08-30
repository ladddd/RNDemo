/**
 * Created by 陈伟达 on 2017/8/29.
 */
import React from 'react'
import BottomTabNavigator from './Widget/BottomTabBar'

export default class HomePage extends React.Component {
    static navigationOptions ={
        header:null, //隐藏bar
    };

    render() {
        return(
            <BottomTabNavigator />
        );
    }
}