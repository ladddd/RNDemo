import React, {Component} from "react";

import {
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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './actions/ProfilePageActions';

export class ProfilePage extends Component {
    static navigationOptions =({ navigation }) => ({
        // title: navigation.state.params.user + '\'s Profile'
    });

    constructor(props) {
        super(props);
    }

    render() {
        const { zip, pressing, checked, forecast } = this.props.profile;
        const { navigate } = this.props.navigation;
        return (
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   resizeMode='cover'
                   style={styles.backdrop}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.welcome}>
                            You input { zip }.
                        </Text>
                        <Text style={{textAlign:'center', color:'#ffffff'}}>
                            The quick <Text style={{fontStyle: "italic"}}>brown</Text> fox
                            <Strong> jumped</Strong> over the lazy <Text style={{fontWeight: "bold"}}>dog</Text>.
                        </Text>
                        <Forecast
                            main={forecast.main}
                            description={forecast.description}
                            temp={forecast.temp}/>
                        <TextInput
                            style={styles.input}
                            returnKeyType='search'
                            underlineColorAndroid='#ffffff'
                            onSubmitEditing={event => this.props.actions.fetchProfileData()}
                            onChangeText= {
                                (text) => this.props.actions.setZip(text)
                            }
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:10,
                        }}>
                            <TouchableHighlight
                                onPressIn={() => this.props.actions.setPressing(true)}
                                onPressOut={() => {
                                    this.props.actions.setPressing(false);
                                    navigate('Gesture')
                                }}
                                style={styles.touchable}>
                                <View style={styles.button}>
                                    <Text style={styles.welcome}>
                                        {pressing ? 'EEK!' : 'Gesture Detector'}
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
                </View>
                <Switch onValueChange={(b) => this.props.actions.setChecked(b)}
                        value={ checked }/>
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

const mapStateToProps = (state) => {
    return {
        profile: state.profilePageReducer,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);