/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:54
 * Desc: authorize reducer
 */
import {createAction, createReducer} from 'redux-act';

const initialState = {
  registering: false,
  username: null,
  failReason: null
};

export const REGIST_REQUEST = createAction('REGIST_REQUEST', (username, password) => ({username, password}));
export const REGIST_SUCCESS = createAction('REGIST_SUCCESS');
export const REGIST_FAIL = createAction('REGIST_FAIL', (failReason) => ({failReason}));

export default createReducer({
  [REGIST_REQUEST]: (state, {username}) => {
    return {
      ...state,
      username,
      registering: true,
      failReason: null
    };
  },

  [REGIST_SUCCESS]: (state) => {
    return {
      ...state,
      registering: false
    };
  },

  [REGIST_FAIL]: (state, {failReason}) => {
    return {
      ...state,
      registering: false,
      failReason
    };
  }
}, initialState);