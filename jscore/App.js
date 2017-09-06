/**
 * Created by 陈伟达 on 2017/8/22.
 */
'use strict';
import React, {Component} from 'react'
import {NativeModules} from 'react-native'
import {connect, Provider} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'
import {store} from './store/store'
import {AppNavigator} from './route/route'

const mapStateToProps = (state) => ({
    nav: state.navReducer,
});

class App extends Component {
    render() {
        return (
            <AppNavigator
                navigation = {addNavigationHelpers({
                    dispatch:this.props.dispatch,
                    state:this.props.nav
                })}/>
        )
    }

    componentDidMount() {
        NativeModules.SplashScreen.hide();
    }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {

    render() {
        return(
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        )
    }

}
