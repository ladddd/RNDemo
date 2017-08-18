/**
 * Created by 陈伟达 on 2017/8/17.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    PanResponder,
} from 'react-native'

const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = 'blue';
const CIRCLE_HIGHLIGHT_COLOR = 'green';

export default class DataFetchPage extends Component {
    static navigationOptions =({ navigation }) => ({
        title: 'Gesture Detector'
    });

    _previousLeft = 0;
    _previousTop = 0;
    _circleStyles = {};
    circle = null;

    constructor(props) {
        super(props);
        this.state={
            numberActiveTouches: 0,
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
        };
        this._circleStyles = {
            left: this._previousLeft,
            top: this._previousTop,
        };
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onMoveShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.circle && this.circle.setNativeProps(
                    {
                        style:{
                            backgroundColor: CIRCLE_HIGHLIGHT_COLOR
                        }
                    });
            },
            onPanResponderMove: (e, gestureState) => {
                this.setState({
                    moveX: gestureState.moveX,
                    moveY: gestureState.moveY,
                    x0: gestureState.x0,
                    y0: gestureState.y0,
                    dx: gestureState.dx,
                    dy: gestureState.dy,
                    vx: gestureState.vx,
                    vy: gestureState.vy,
                    numberActiveTouches: gestureState.numberActiveTouches
                });
                this._circleStyles.left = this._previousLeft + gestureState.dx;
                this._circleStyles.top = this._previousTop + gestureState.dy;
                this._circleStyles.backgroundColor = CIRCLE_HIGHLIGHT_COLOR;
                this.circle && this.circle.setNativeProps({
                    style:this._circleStyles
                });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.circle && this.circle.setNativeProps({
                    style:{
                        backgroundColor: CIRCLE_COLOR
                    }
                });
                this._previousLeft += gestureState.dx;
                this._previousTop += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.circle && this.circle.setNativeProps({
                    style:{
                        backgroundColor: CIRCLE_COLOR
                    }
                });
                this._previousLeft += gestureState.dx;
                this._previousTop += gestureState.dy;
            },
        })
    }

    render() {
        return (
            <View style={styles.container}
                  {...this._panResponder.panHandlers}>
                <View
                    ref={(circle) => {
                        this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}/>
                <Text>
                    {this.state.numberActiveTouches} touches,
                    dx: {this.state.dx},
                    dy: {this.state.dy},
                    vx: {this.state.vx},
                    vy: {this.state.vy}
                </Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: CIRCLE_COLOR,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    container:{
        flex:1
    }
});
