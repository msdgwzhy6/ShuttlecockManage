/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:56
 * Desc: authorize saga
 */
import {takeLatest, put} from "redux-saga/effects";
import {REGIST_FAIL, REGIST_REQUEST, REGIST_SUCCESS} from "../reducers/register";
import AV from "leancloud-storage";
import {SET_LOGIN_USERNAME} from "../reducers/login";
import {Toast} from "antd-mobile";

function* REGIST_REQUEST_HANDLE({payload: {username, password}}) {
  try {
    // 新建 AVUser 对象实例
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    yield user.signUp();
    yield put(REGIST_SUCCESS());
    yield put(SET_LOGIN_USERNAME(username));
    Toast.success('注册成功', 1)
    setTimeout(_ => NavUtils.navBack(), 1000)
  } catch ({code, rawMessage}) {
    Toast.fail(rawMessage)
    yield put(REGIST_FAIL())
  }
};

export default function* register() {
  yield takeLatest(REGIST_REQUEST, REGIST_REQUEST_HANDLE)
};