/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:54
 * Desc: authorize reducer
 */
import {createAction, createReducer} from 'redux-act';

const initialState = {
  loading: false,
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
      loading: true,
      failReason: null
    };
  },

  [REGIST_SUCCESS]: (state) => {
    return {
      ...state,
      loading: false
    };
  },

  [REGIST_FAIL]: (state, {failReason}) => {
    return {
      ...state,
      loading: false,
      failReason
    };
  }
}, initialState);