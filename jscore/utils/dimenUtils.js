/**
 * Created by 陈伟达 on 2017/8/29.
 */

import { Dimensions } from 'react-native'

const deviceHeightDp = Dimensions.get('window').height;
// 设计屏幕高度
const uiHeightPx = 592;

export function px2dp(uiElementPx) {
    return uiElementPx * deviceHeightDp / uiHeightPx
}