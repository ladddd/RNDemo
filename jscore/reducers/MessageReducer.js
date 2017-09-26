/**
 * Created by 陈伟达 on 2017/9/6.
 */
import * as types from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: false,
    noData: false,
    messageList:[],
    pageNum:1,
    canLoadMore:false,
};

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_MESSAGE_LIST_REQUEST:
            let newState = Object.assign({}, state, {
                ...state,
                loading:true,
                pageNum:1,
            });
            console.log("fetch : " + JSON.stringify(newState));
            return newState;

        case types.LOAD_MORE_MESSAGE_LIST_REQUEST:
            let newState2 = Object.assign({}, state, {
                ...state,
                pageNum:action.dataSource,
            });
            console.log("fetch more : " + JSON.stringify(newState2));
            return newState2;

        case types.FETCH_MESSAGE_LIST_SUCCESS:
            let newState3 = Object.assign({}, state, {
                ...state,
                loading:false,
                error:false,
                messageList:action.dataSource,
                canLoadMore:action.extra,
                noData:action.dataSource.length <= 0
            });
            console.log("success : " + JSON.stringify(newState3));
            return newState3;

        case types.LOAD_MORE_MESSAGE_LIST_SUCCESS:
            let newState4 = Object.assign({}, state, {
                ...state,
                messageList:state.messageList.concat(action.dataSource),
                canLoadMore:action.extra
            });
            console.log("more success : " + JSON.stringify(newState4));
            return newState4;

        case types.FETCH_MESSAGE_LIST_FAILURE:
            let newState5 = Object.assign({}, state, {
                ...state,
                loading:false,
                error:true,
            });
            console.log("fail : " + JSON.stringify(newState5));
            return newState5;

        case types.LOAD_MORE_MESSAGE_LIST_FAILURE:
            let newState6 = Object.assign({}, state, {
                ...state,
                pageNum:state.pageNum - 1,
            });
            console.log("more fail : " + JSON.stringify(newState6));
            return newState6;
        default:
            return state
    }
}

