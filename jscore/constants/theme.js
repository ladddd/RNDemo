/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Dimensions, Platform, StatusBar} from 'react-native';
import { px2dp } from '../utils/dimenUtils';

export default {
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableOpacityActiveOpacity: 0.8,
    toolbar: {
        height: Platform.OS === 'android' ? px2dp(40) : px2dp(49),
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        titleColor: '#fff',
        titleSize: Platform.OS === 'android' ? px2dp(16) : px2dp(14),
        textBtnSize: Platform.OS === 'android' ? px2dp(12) : px2dp(11)
    }
}