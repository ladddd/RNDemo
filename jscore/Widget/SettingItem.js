/**
 * Created by 陈伟达 on 2017/8/30.
 */
import React, {Component, PropTypes} from 'react'
import {
    View,
    TouchableNativeFeedback,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import theme from '../constants/theme'
import {px2dp} from '../utils/dimenUtils'

export default class SettingItem extends Component {
    static propTypes = {
        title:PropTypes.string,
        iconImage: PropTypes.number,
        showBottomLine: PropTypes.bool,
        marginTop: PropTypes.number,
        rightComponent: PropTypes.object,
        onPress: PropTypes.func,
        disable: PropTypes.bool
    };
    static defaultProps = {
        showBottomLine: true,
        marginTop:0,
    };

    render() {
        return (
            <TouchableNativeFeedback onPress={this.props.onPress} disabled={!this.props.onPress}>
                <View style={[styles.root, {marginTop:this.props.marginTop}]}>
                    <View style={styles.divider}/>
                    <View style={[styles.container]}>
                        <View style={styles.left}>
                            <Image style={styles.icon} source={this.props.iconImage} resizeMode='center'/>
                            <Text style={styles.title} >{this.props.title}</Text>
                        </View>
                        <View style={styles.right}>
                            {
                                this.props.rightComponent !== null?
                                    this.props.rightComponent
                                    :
                                    null
                            }
                        </View>
                    </View>
                    {
                        this.props.showBottomLine?
                            <View style={styles.divider}/>
                            :
                            null
                    }
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection:'column',
        backgroundColor:'white'
    },
    container: {
        flexDirection:'row',
        width: theme.screenWidth,
        height: 55,
        alignItems: 'center',
    },
    left:{
        flex: 1,
        flexDirection:'row',
    },
    right:{
        alignItems: 'flex-end',
        marginRight:25,
    },
    icon: {
        width:20,
        height:20,
        marginLeft:15
    },
    title:{
        marginLeft:10,
        fontSize:16,
        color:'#191919',
    },
    divider: {
        width: theme.screenWidth,
        height: px2dp(1),
        backgroundColor:'#d9d9d9'
    },
});