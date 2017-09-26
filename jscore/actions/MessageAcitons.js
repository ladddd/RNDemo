/**
 * Created by 陈伟达 on 2017/9/6.
 */
import * as types from './actionTypes'
import Http from '../network/Http'
import Urls from '../network/Urls'

export function requestData() {
    return {
        type: types.FETCH_MESSAGE_LIST_REQUEST
    }
}

export function receiveData(data) {
    console.log("received, length = " + data.list.length);
    return {
        type: types.FETCH_MESSAGE_LIST_SUCCESS,
        dataSource: data.list,
        extra: data.pageNum < data.pages,
    }
}

export function fetchFailure(error) {
    console.log("failure");
    return {
        type: types.FETCH_MESSAGE_LIST_FAILURE,
        dataSource: error
    }
}

export function loadMoreData(pageNum) {
    return {
        type: types.LOAD_MORE_MESSAGE_LIST_REQUEST,
        dataSource:pageNum,
    }
}

export function receiveMoreData(data) {
    return {
        type: types.LOAD_MORE_MESSAGE_LIST_SUCCESS,
        dataSource: data.list,
        extra: data.pageNum < data.pages,
    }
}

export function loadMoreFailure(error) {
    return {
        type: types.LOAD_MORE_MESSAGE_LIST_FAILURE,
        dataSource: error
    }
}

export function fetchMessageList() {
    return (dispatch) => {
        dispatch(requestData());
        getMessageList(1, 3).then(data => {
            dispatch(receiveData(data));
        }).catch(exception => {
            dispatch(fetchFailure(exception))
        });
    }
}

export function loadMore(pageNum) {
    return (dispatch) => {
        dispatch(loadMoreData(pageNum));
        getMessageList(pageNum, 3).then(data => {
            dispatch(receiveMoreData(data));
        }).catch(exception => {
            dispatch(loadMoreFailure(exception))
        });
    }
}

function getMessageList(pageNum, pageSize) {
    let url = Urls.messageList + '?pageNum=' + pageNum.toString() + '&pageSize=' + pageSize.toString();
    return Http.get(url);
}