import React, {Component} from "react";

import {
    AppRegistry,
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ToastAndroid,
    TouchableHighlight,
    Switch,
} from "react-native";
import Forecast from './Widget/Forecast';

export default class ProfilePage extends Component {
    static navigationOptions =({ navigation }) => ({
        title: navigation.state.params.user + '\'s Profile'
    });

    constructor(props) {
        super(props);
        this.state={
            zip: '',
            pressing: false,
            checked:false,
            forecast: {
                main: 'Clouds',
                description: 'few clouds',
                temp: 45.7
            }
        }
    }

    _handleSubmit(location) {
        //在这里尝试state读写都有问题
        // var location = this.state.forecast.main;
        fetch('http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments?page=1')
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    forecast: {
                        main: responseJSON.status,
                        description: responseJSON.status,
                        temp: responseJSON.count
                    }
                })
            })
            .catch((error) => {

            })
    }

    _onPressIn() {
        //在这里尝试state读写都有问题 ??
        this.setState({
            pressing:true
        })
    }

    _onPressOut() {
        this.setState({
            pressing:false
        })
    }

    render() {
        const {params} = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        return (
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   resizeMode='cover'
                   style={styles.backdrop}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.welcome}>
                            You input {this.state.zip}.
                        </Text>
                        <Text style={{textAlign:'center', color:'#ffffff'}}>
                            The quick <Text style={{fontStyle: "italic"}}>brown</Text> fox
                            <Strong> jumped</Strong> over the lazy <Text style={{fontWeight: "bold"}}>dog</Text>.
                        </Text>
                        <Forecast
                            main={this.state.forecast.main}
                            description={this.state.forecast.description}
                            temp={this.state.forecast.temp}/>
                        <TextInput
                            style={styles.input}
                            returnKeyType='search'
                            underlineColorAndroid='#ffffff'
                            onSubmitEditing={event => this._handleSubmit(event)}
                            onChangeText= {
                                (text) => this.setState({zip:text})
                            }
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:10,
                        }}>
                            <TouchableHighlight
                                onPressIn={() => this.setState({pressing:true})}
                                onPressOut={() => {
                                    this.setState({pressing:false});
                                    navigate('Gesture')
                                }}
                                style={styles.touchable}>
                                <View style={styles.button}>
                                    <Text style={styles.welcome}>
                                        {this.state.pressing ? 'EEK!' : 'Gesture Detector'}
                                    </Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPressIn={() => {}}
                                onPressOut={() => {navigate('Flex')}}
                                style={{height:50, width:100, justifyContent:'center', marginLeft:10}}>
                                <View style={{justifyContent:'center', backgroundColor:'#ffff00'}}>
                                    <Text style={[styles.welcome, {color: '#000000'}]}>
                                        <Strong>Flex</Strong>
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                    </View>
                    {/*<Image style={{width: 300, height: 400} } resizeMode={'contain'}*/}
                    {/*source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>*/}
                </View>
                <Switch onValueChange={(b) => this.setState({checked:b})}
                        value={this.state.checked}/>
            </Image>
        );
    }
}

//自定义文本样式标签
const Strong = React.createClass({
    render() {
        return (
            <Text style={{fontWeight:'bold'}}>
                {this.props.children}
            </Text>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff'
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#ffffff',
        height: 50,
        marginTop:10,
        color: '#ffffff',
    },
    backdrop: {
        flex:1,
        // flexDirection:'column',
    },
    touchable: {
        borderRadius: 100,
        height: 200,
        width: 200,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FF0000',
        borderRadius: 100,
        height: 200,
        width: 200,
        justifyContent: 'center'
    },
});

AppRegistry.registerComponent('ProfilePage', () => ProfilePage);