/**
 * Created by 陈伟达 on 2017/8/29.
 */
import React from 'react'
import {View, Text, Image, StatusBar, StyleSheet, ScrollView, ToastAndroid} from 'react-native'
import theme from '../constants/theme';
import SettingItem from "../Widget/SettingItem";

export default class MessagePage extends React.Component {

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <StatusBar translucent={true} backgroundColor={'#f05c4e'}/>
                    <Image style={styles.img} source={require('../images/stripes.png')} resizeMode='cover'>
                        <View style={styles.userInfo}>
                            <Image style={styles.avatar} source={require('../images/bighead_me.png')} resizeMode='cover'/>
                            <Text style={styles.infoTextMain} numberOfLines={1} ellipsizeMode={'tail'}>看板小二</Text>
                            <Text style={styles.infoTextSub} numberOfLines={1} ellipsizeMode={'tail'}>杭州看板科技有限公司</Text>
                        </View>
                    </Image>
                    <SettingItem title="公司认证" iconImage={require('../images/identification_me.png')} marginTop={10}
                                 rightComponent={<Text style={styles.stateText}>已验证</Text>}
                                 onPress={() => {
                                     ToastAndroid.show('进入公司认证界面', ToastAndroid.SHORT)}}
                    />
                    <SettingItem title="客户统计" iconImage={require('../images/custom_me.png')} marginTop={10}
                                 showBottomLine={false} rightText={'245'}
                                 rightComponent={<Text style={styles.rightText}>{245}</Text>}/>
                    <SettingItem title="媒体总计" iconImage={require('../images/media_me.png')} rightText={'108'}
                                 rightComponent={<Text style={styles.rightText}>{108}</Text>}/>
                    <SettingItem title="使用帮助" iconImage={require('../images/help_me.png')} marginTop={10}
                                 rightComponent={<Image source={require('../images/right_arrow.png')} resizeMode='center'/>}
                                 onPress={() => {
                                     ToastAndroid.show('进入帮助页面', ToastAndroid.SHORT)}}
                    />
                    <SettingItem title="设置" iconImage={require('../images/setup_me.png')} marginTop={10}
                                 rightComponent={<Image source={require('../images/right_arrow.png')} resizeMode='center'/>}
                                 onPress={() => {
                                     ToastAndroid.show('进入设置页面', ToastAndroid.SHORT)}}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    userInfo:{
        marginTop:68,
        alignItems: 'center',
    },
    img:{
        width:theme.screenWidth,
        height:211,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:25,
    },
    infoTextMain: {
        color:'white',
        fontSize:16,
        marginTop:15
    },
    infoTextSub: {
        color:'#f7b1ac',
        fontSize:14,
        marginTop:4

    },
    rightText:{
        fontSize:16,
        color:'#7b8a9e'
    },
    stateText:{
        backgroundColor: '#78cc5b',
        padding:4,
        borderRadius:2,
        color:'white'
    }
});