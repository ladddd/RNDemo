/**
 * Created by 陈伟达 on 2017/8/22.
 */

'use strict';
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import React from 'react'
import reduces from '../reducers/reduces';

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = applyStoreMiddleware(reduces);