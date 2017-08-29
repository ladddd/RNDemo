/**
 * Created by 陈伟达 on 2017/8/28.
 */
import React from 'react'
import {Image} from 'react-native'
import MainPage from '../MainPage'
import ProfilePage from '../ProfilePage'
import ListPage from '../ListPage'
import FlexPage from '../FlexPage'
import {TabNavigator} from 'react-navigation'
import { NavigationComponent } from 'react-native-material-bottom-navigation'

export const Route = {
    Home:{screen:MainPage},
    Profile:{screen:ProfilePage},
    List:{screen:ListPage},
    Flex:{screen:FlexPage},
};

export const AppNavigator = TabNavigator(
    Route,
    {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions:{
            bottomNavigationOptions: {
                labelColor: '#999999',
                rippleColor: 'white',
                shifting: false,
                tabs: {
                    Home: {
                        tabBarLabel: "Media",
                        icon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                     source={require('../images/media.png')}/>,
                        activeIcon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                           source={require('../images/media_selected.png')}/>
                    },
                    Profile: {
                        tabBarLabel: "Order",
                        icon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                     source={require('../images/bill.png')}/>,
                        activeIcon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                           source={require('../images/bill_selected.png')}/>
                    },
                    List: {
                        tabBarLabel: "Message",
                        icon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                     source={require('../images/message.png')}/>,
                        activeIcon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                           source={require('../images/message_selected.png')}/>
                    },
                    Flex: {
                        tabBarLabel: "My",
                        icon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                     source={require('../images/user.png')}/>,
                        activeIcon: <Image style={{width: 24, height: 24} } resizeMode={'contain'}
                                           source={require('../images/user_selected.png')}/>
                    }
                }
            }
        }
    }
);