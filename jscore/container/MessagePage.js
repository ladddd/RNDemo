/**
 * Created by 陈伟达 on 2017/8/29.
 */
import React from 'react'
import {View, Text} from 'react-native'
import Toolbar from '../Widget/ToolBar'

export default class MessagePage extends React.Component {

    render() {
        return(
            <View>
                <Toolbar title='消息中心'/>
                <Text>Message</Text>
            </View>
        );
    }
}