/**
 * Created by 陈伟达 on 2017/8/24.
 */

import * as types from './actionTypes'

export function setChatter(text) {
    return {
        type: types.MAIN_PAGE_CHATTER_TEXTCHANGE,
        dataSource: text,
    }
}