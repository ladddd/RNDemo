import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from "react-native";

export default class Forecast extends Component {
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                backgroundColor:'#0099ff',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp}°F
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: '#ff4455'
    },
    mainText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: '#ff4455'
    }
});