/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午10:01
 * Desc:
 */
import {combineReducers} from "redux";
//非表单特别多的情况不适用redux-form
import { reducer as form } from 'redux-form/immutable'
import nav from "./reducers/nav";
import register from "./reducers/register";
import login from "./reducers/login";

export const rootReducer = combineReducers({
  nav, form, register, login
});

// 添加persist黑名单，以下这些reducer不需要持久化
export const persistentStoreBlacklist = [
    register, login
];