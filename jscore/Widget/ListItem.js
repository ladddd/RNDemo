/**
 * Created by 陈伟达 on 2017/8/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
} from 'react-native';

export default class ListItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} resizeMode={'cover'}/>
                {/*<Image style={{width: 100, height: 100} } resizeMode={'contain'}*/}
                {/*source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>*/}
                <Text style={{width: 300}}>
                    {this.props.uri}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    },
    image:{
        width:100,
        height:100
    }
});