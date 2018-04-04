/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:56
 * Desc: authorize saga
 */
import {takeLatest, put} from "redux-saga/effects";
import {REGIST_FAIL, REGIST_REQUEST, REGIST_SUCCESS} from "../reducers/authorize";
import AV from "leancloud-storage";

const resultCodeMap = {
  202: '用户名已被占用'
};

function* REGIST_REQUEST_HANDLE({payload: {username, password}}) {
  try {
    // 新建 AVUser 对象实例
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    yield user.signUp();
    yield put(REGIST_SUCCESS());
  } catch ({code, rawMessage}) {
    console.log(rawMessage)
    yield put(REGIST_FAIL(resultCodeMap[code]));
  }
};

export default function* authorize() {
  yield takeLatest(REGIST_REQUEST, REGIST_REQUEST_HANDLE)
};