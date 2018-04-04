/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 上午10:01
 * Desc:
 */
import {combineReducers} from "redux";
import { reducer as form } from 'redux-form/immutable'
import {login} from "./reducers/login";

export const rootReducer = combineReducers({
  form, login
});