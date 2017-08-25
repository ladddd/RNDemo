/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ToastAndroid,
} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions/MainPageActions';

export class MainPage extends Component {
    static navigationOptions ={
        title: 'Welcome',
        header:null //隐藏bar
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { chatter } = this.props.main;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={ 'input who you want chat to'}
                    onChangeText={
                        (text) => {
                            this.props.actions.setChatter(text)
                        }
                    }>
                    {/*onSubmitEditing={this._handleTextChange()}>*/}
                </TextInput>

                <Text style={styles.instructions}>
                    {/*Chat with {this.state.chatter}*/}
                    Chat with {chatter}
                </Text>

                <Image style={{width: 300, height: 400} } resizeMode={'contain'}
                       source={require('./images/test.png')}/>

                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
                    <Button title="Jump Profile" color="#999999" onPress={() =>
                        navigate('Profile', {user : chatter})
                    }/>
                    <Button title="Jump List" color="#999999" onPress={() =>
                        navigate('List')
                    }/>
                </View>
            </View>
        );
    }
}

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

const mapStateToProps = (state) => {
    return {
        main: state.mainPageReducer,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
