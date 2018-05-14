/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-4
 * Time: 下午2:39
 * Desc: 全局对象
 */
import NavUtils from "./NavUtils";
import http from "./HttpUtils"

global.NavUtils = NavUtils;
global.HTTP = http;