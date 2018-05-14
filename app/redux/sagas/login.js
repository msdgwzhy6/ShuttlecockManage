/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:56
 * Desc: authorize saga
 */
import {takeLatest, put} from "redux-saga/effects";
import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST} from "../reducers/login";
import {Toast} from "antd-mobile";

function* LOGIN_REQUEST_HANDLE({payload: {username, password}}) {
  try {
    const {success, object, message} = yield HTTP.postJson('logon', {
      userName: username,
      password
    })
    if (!success) {
      throw message
    }
    yield put(LOGIN_SUCCESS(object));
    Toast.success('登陆成功', 0.5);
    setTimeout(_ => NavUtils.navResetTo('Home'), 500)
  } catch (err) {
    Toast.fail(err);
    yield put(LOGIN_FAIL())
  }
};

function* LOGOUT_REQUEST_HANDLE() {
  try {
    NavUtils.navResetTo('Login')
  } catch (err) {
    Toast.fail('登出失败');
  }
};

export default function* login() {
  yield takeLatest(LOGIN_REQUEST, LOGIN_REQUEST_HANDLE)
  yield takeLatest(LOGOUT_REQUEST, LOGOUT_REQUEST_HANDLE)
};