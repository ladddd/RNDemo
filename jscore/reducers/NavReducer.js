/**
 * Created by 陈伟达 on 2017/8/25.
 */
import {AppNavigator} from '../route/route'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export default function navReducer(state=initialState, action) {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};