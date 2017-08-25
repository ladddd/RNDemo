/**
 * Created by 陈伟达 on 2017/8/25.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    zip: '',
    pressing: false,
    checked: false,
    forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7
    }
};

export default function profilePageReducer(state = initialState, action) {
    switch (action.type) {

        case types.PROFILE_PAGE_ZIP_TEXTCHANGE:
            return Object.assign({}, state, {
                ...state,
                zip: action.dataSource
            });
        case types.PROFILE_PAGE_PRESS_STATE_CHANGE:
            return Object.assign({}, state, {
                ...state,
                pressing: action.dataSource
            });
        case types.PROFILE_PAGE_CHECK_STATE_CHANGE:
            return Object.assign({}, state, {
                ...state,
                checked: action.dataSource
            });
        case types.FETCH_PROFILE_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                forecast: {
                    main: 'fetching',
                    description: 'fetching',
                    temp: 'fetching'
                }
            });
        case types.FETCH_PROFILE_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                forecast: {
                    main: action.dataSource.status,
                    description: action.dataSource.status,
                    temp: action.dataSource.count
                }
            });
        case types.FETCH_PROFILE_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                forecast: {
                    main: 'failed',
                    description: 'failed',
                    temp: 'failed'
                }
            });
        default:
            return state;
    }
}