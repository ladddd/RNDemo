/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ToastAndroid,
} from "react-native";
import {
    StackNavigator,
} from 'react-navigation';
import ProfilePage from './jscore/ProfilePage';
import GesturePage from './jscore/GesturePage';
import ListPage from './jscore/ListPage';
import FlexPage from './jscore/FlexPage';
import ToolbarAndroid from 'ToolbarAndroid';
import ErrorUtils from 'ErrorUtils';

// var React = require('react'); //require是node.js语法， import export是ES6标准
// var {Component} = React;
// var ToolbarAndroid = require('ToolbarAndroid');
// var ErrorUtils = require('ErrorUtils');

export default class RNDemo extends Component {
    static navigationOptions ={
        title: 'Welcome',
        header:null //隐藏bar
    };

    constructor(props) {
        super(props);
        this.state = {
            text: 'nimahai',
            forecast: {
                main: 'Clouds',
                description: 'few clouds',
                temp: 45.7,
            }
        };
    }

    // _handleTextChange() {
    //     this.setState({
    //         text:'???'
    //     });
    // }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={ 'input who you want chat to'}
                    onChangeText= {
                        (text) => this.setState({text:text})
                    }>
                    {/*onSubmitEditing={this._handleTextChange()}>*/}
                </TextInput>

                <Text style={styles.instructions}>
                    Chat with {this.state.text}
                </Text>

                {/*<Image style={{width: 300, height: 400} } resizeMode={'contain'}*/}
                {/*source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>*/}
                <Image style={{width: 300, height: 400} } resizeMode={'contain'}
                       source={require('./jscore/images/test.png')}/>

                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
                    <Button title="Jump Profile" color="#999999" onPress={() =>
                        navigate('Profile', {user : this.state.text})
                    }/>
                    <Button title="Jump List" color="#999999" onPress={() =>
                        navigate('List')
                    }/>
                </View>
            </View>
        );
    }
}

// const style = {
//     fontSize: 20,
//     textAlign: 'center',
//     margin:10,
// };

const styles = StyleSheet.create({
    input:{
        fontSize: 20,
        height: 60,
        width: 300,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 16,
    },
    toolbar: {
        height: 56,
        backgroundColor: '#FF6600'
    },

});

export const App = StackNavigator(
    {
        Home:{screen:RNDemo},
        Profile:{screen:ProfilePage},
        Gesture:{screen:GesturePage},
        List:{screen:ListPage},
        Flex:{screen:FlexPage},
    },
    {
        swipeEnabled:true,
        headerMode: 'screen',
        mode: 'card',
    }
);

AppRegistry.registerComponent('RNDemo', () => App);
