/**
 * Created by 陈伟达 on 2017/8/31.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native'
import theme from './constants/theme'
import {px2dp} from './utils/dimenUtils'
import ClearableInput from './Widget/ClearableInput'
import Urls from './network/Urls'
import Http from './network/Http'
import {hex_md5} from './utils/md5Utils'
import global from './global/global'

export default class LoginPage extends Component {
    static navigationOptions ={
        header:null, //隐藏bar
    };

    constructor(props) {
        super(props);
        this.state = {
            account:'',
            password:'',
        };
    }

    _login() {
        if (this.state.account === '') {
            ToastAndroid.show('请输入账号', ToastAndroid.SHORT)
        } else if (this.state.password === '') {
            ToastAndroid.show('请输入密码', ToastAndroid.SHORT)
        } else {
            Http.post(Urls.login, {
                'username': this.state.account,
                'password': hex_md5(this.state.password)
            }).then(data => {
                console.log(data.appAk);
                global.accessToken = data.appAk;
                this.props.navigation.navigate('Home')
            }).catch(exception => {
                ToastAndroid.show(JSON.stringify(exception), ToastAndroid.LONG)
            });
        }
    }

    render() {
        // const { navigate } = this.props.navigation;
        return(
            <View style={styles.root}>
                <StatusBar translucent={true} backgroundColor={'#f05c4e'}/>
                <View style={styles.inputContainer}>
                    <ClearableInput inputStyle={styles.input} maxLength={30} placeHolder="输入手机号码" propertyName={this.state.account}
                                    onChangeText={(text) => {
                                        this.setState({account:text})
                                    }}
                    />
                    <View style={styles.divider}/>
                    <ClearableInput inputStyle={styles.input} maxLength={20} placeHolder="输入登录密码" propertyName={this.state.password} password={true}
                                    onChangeText={(text) => {
                                        this.setState({password:text})
                                    }}
                    />
                </View>

                <TouchableNativeFeedback onPress={this._login.bind(this)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>登录</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        flexDirection:'column',
        backgroundColor:theme.pageBackgroundColor,
        // alignItems:'center'
    },
    inputContainer:{
        flexDirection:'column',
        backgroundColor:'white',
        borderWidth:px2dp(1),
        borderColor:'#d9d9d9',
        borderRadius:5,
        marginTop:120,
        marginLeft:22,
        marginRight:22,
    },
    input:{
        height:55,
        marginLeft:20,
    },
    divider: {
        width: theme.screenWidth,
        height: px2dp(1),
        backgroundColor:'#d9d9d9'
    },
    btn:{
        height:50,
        borderRadius:25,
        backgroundColor:'#f05c4e',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:22,
        marginRight:22,
        marginTop:50
    },
    btnText:{
        textAlign:'center',
        fontSize:16,
        color:'white',
    }
});