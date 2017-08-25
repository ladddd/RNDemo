/**
 * Created by 陈伟达 on 2017/8/24.
 */

import {combineReducers} from 'redux';
import mainPageReducer from './MainPageReducer'
import navReducer from './NavReducer'
import profilePageReducer from './ProfilePageReducer'

export default combineReducers({
    mainPageReducer,
    navReducer,
    profilePageReducer,
});