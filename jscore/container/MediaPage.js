/**
 * Created by 陈伟达 on 2017/8/29.
 */
import React from 'react'
import {Text, View, StatusBar} from 'react-native'

export default class MediaPage extends React.Component {

    render() {
        return(
            <View>
                <StatusBar translucent={true} backgroundColor={'#f05c4e'}/>
                <Text>Media</Text>
            </View>
        );
    }
}