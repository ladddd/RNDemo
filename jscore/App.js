/**
 * Created by 陈伟达 on 2017/8/22.
 */
'use strict';
import {connect, Provider} from 'react-redux'
import React, {Component} from 'react'
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
