/**
 * Created by 陈伟达 on 2017/8/24.
 */
//提供首页 交互 <-> state 的联系
import * as types from '../actions/actionTypes';

const initialState = {
    chatter: 'Smith',
    forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7,
    }
};

export default function mainPageReducer(state=initialState, action) {
    switch (action.type) {

        case types.MAIN_PAGE_CHATTER_TEXTCHANGE:
            return Object.assign({}, state, {
                ...state,
                chatter: action.dataSource
            });

        default:
            return state;
    }
}