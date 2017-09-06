/**
 * Created by 陈伟达 on 2017/8/24.
 */

import {combineReducers} from 'redux';
import mainPageReducer from './MainPageReducer'
import navReducer from './NavReducer'
import profilePageReducer from './ProfilePageReducer'
import tabReducer from './tabReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    mainPageReducer,
    navReducer,
    profilePageReducer,
    tabReducer,
    loginReducer
});