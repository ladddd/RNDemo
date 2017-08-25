/**
 * Created by 陈伟达 on 2017/8/24.
 */
import MainPage from '../MainPage'
import ProfilePage from '../ProfilePage'
import GesturePage from '../GesturePage';
import ListPage from '../ListPage';
import FlexPage from '../FlexPage';
import {StackNavigator} from 'react-navigation'

export const Route = {
    Home:{screen:MainPage},
    Profile:{screen:ProfilePage},
    Gesture:{screen:GesturePage},
    List:{screen:ListPage},
    Flex:{screen:FlexPage},
};

export const AppNavigator = StackNavigator(
    Route,
    {
        swipeEnabled:true,
        headerMode: 'screen',
        mode: 'card',
        initialRouteName:'Home',
    }
);