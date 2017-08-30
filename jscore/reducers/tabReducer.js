/**
 * Created by 陈伟达 on 2017/8/29.
 */

import * as types from '../actions/actionTypes'

const initialState = {
    selectedTab: 'Home'
};

export default function tabReducer(state = initialState, action) {
    switch (action.type) {
        case types.CLICK_TAB:
            return {
                selectedTab: action.dataSource
            };
        default:
            return state;
    }
}