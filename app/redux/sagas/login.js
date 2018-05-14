/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午4:56
 * Desc: authorize saga
 */
import {takeLatest, put} from "redux-saga/effects";
import AV from "leancloud-storage";
import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS} from "../reducers/login";
import {Toast} from "antd-mobile";

function* LOGIN_REQUEST_HANDLE({payload: {username, password}}) {
<<<<<<< HEAD
    try {
        // const user = yield AV.User.logIn(username, password);
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

export default function* login() {
    yield takeLatest(LOGIN_REQUEST, LOGIN_REQUEST_HANDLE)
=======
  try {
    const user = yield AV.User.logIn(username, password);
    yield put(LOGIN_SUCCESS(user));
    Toast.success('登陆成功', 0.5);
    setTimeout(_ => NavUtils.navResetTo('Home'), 500)
  } catch ({code, rawMessage}) {
    Toast.fail(rawMessage);
    yield put(LOGIN_FAIL())
  }
};

export default function* login() {
  yield takeLatest(LOGIN_REQUEST, LOGIN_REQUEST_HANDLE)
>>>>>>> b26c28bf68512a363fc4e22f83167ad70db19585
};