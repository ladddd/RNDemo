/**
 * Created by 陈伟达 on 2017/8/29.
 */
import * as types from './actionTypes'

export function setSelected(selectedTabName) {
    return {
        type: types.CLICK_TAB,
        dataSource: selectedTabName,
    }
}