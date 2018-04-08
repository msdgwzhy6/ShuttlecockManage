/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-3-22
 * Time: 上午9:09
 * Desc:
 */
import * as Screens from "../screen";

export const MainRoutes = [
  {
    id: 'Login',
    title: '登录',
    screen: Screens.Login
  },
  {
    id: 'Register',
    title: '注册',
    screen: Screens.Register
  },
  {
    id: 'Home',
    title: 'Home',
    screen: Screens.Home
  }
];
