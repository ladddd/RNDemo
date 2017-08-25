/**
 * Created by 陈伟达 on 2017/8/25.
 */
import * as types from './actionTypes'

export function setZip(text) {
    return {
        type: types.PROFILE_PAGE_ZIP_TEXTCHANGE,
        dataSource: text,
    }
}

export function setPressing(pressing) {
    return {
        type: types.PROFILE_PAGE_PRESS_STATE_CHANGE,
        dataSource: pressing,
    }
}

export function setChecked(checked) {
    return {
        type: types.PROFILE_PAGE_CHECK_STATE_CHANGE,
        dataSource: checked,
    }
}

function requestData() {
    return {
        type: types.FETCH_PROFILE_DATA_REQUEST,
    };
}

function receiveData(json){
    return {
        type: types.FETCH_PROFILE_DATA_SUCCESS,
        dataSource: json,
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_PROFILE_DATA_FAILURE
    };
}

export function fetchProfileData() {
    return (dispatch) => {
        dispatch(requestData());
        fetch('http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments?page=1')
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(receiveData(responseJSON));
            })
            .catch((error) => {
                dispatch(fetchFailure())
            })
    }
}