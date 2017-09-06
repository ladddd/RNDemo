/**
 * Created by 陈伟达 on 2017/8/31.
 */
import React, {Component, PropTypes} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight
} from 'react-native'

export default class ClearableInput extends Component {

    static propTypes = {
        inputStyle:PropTypes.number,
        maxLength:PropTypes.number,
        placeHolder:PropTypes.string,
        propertyName:PropTypes.string,
        password:PropTypes.bool,
        onChangeText:PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            text:this.props.propertyName,
            hide:this.props.password
        };
    }

    _onChangeText(text) {
        this.setState({text:text});
        if (this.props.onChangeText !== null)
            this.props.onChangeText(text)
    }

    _onDeletePress() {
        this.setState({text:''})
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={[this.props.inputStyle, {flex:1}]} autoCorrect={false} selectionColor={'#f05c4e'}
                           numberOfLines={1} underlineColorAndroid={'transparent'} maxLength={this.props.maxLength}
                           placeholder={this.props.placeHolder} placeholderTextColor={'#dddddd'}
                           onChangeText={this._onChangeText.bind(this)} secureTextEntry={this.state.hide}
                >
                    {this.state.text}
                </TextInput>
                <View style={styles.icon}>
                    {
                        this.state.text !== ''?
                            <TouchableHighlight
                                onPressIn={this._onDeletePress.bind(this)}
                                onPressOut={() => {}}
                                style={styles.icon}
                            >
                                <Image style={styles.iconImage} source={require('../images/ico_del.png')} resizeMode={'center'}/>
                            </TouchableHighlight>
                            :
                            null
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
    },
    icon:{
        width:15,
        height:15,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    iconImage:{
        width:15,
        height:15,
    }
});