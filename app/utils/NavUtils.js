/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-2-27
 * Time: 下午5:48
 * Desc: 路由跳转工具类
 */
import store from "../redux/store";
import {NavigationActions} from "react-navigation";

//路由跳转
function navTo(routeName, params) {
  store.dispatch(NavigationActions.navigate({routeName, params}));
}
/**
 * 返回
 * @param key  返回到指定路由  key = 'route-key' route-key为要返回路由的下一层
 * 比如 [
 *  {routeName: "Login", key: "id-1522829051196-2"}
 *  {params: undefined, routeName: "Home", key: "id-1522829051196-3"}
 *  {params: undefined, routeName: "Register", key: "id-1522829051196-4"}
 * ] 要返回Login时 key = 'id-1522829051196-3'
 */
function navBack(key) {
  store.dispatch(NavigationActions.back({key}));
}
//重定向至
function navResetTo(routeName, params) {
  store.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName, params})
      ]
    }
  ));
}

export default {
  navTo, navBack, navResetTo
}
