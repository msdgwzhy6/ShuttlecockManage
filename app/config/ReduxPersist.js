/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 18-4-8
 * Time: 下午7:02
 * Desc: redux持久化配置
 */
import { AsyncStorage } from 'react-native';
import {persistentStoreBlacklist} from "../redux/reducer";


const REDUX_PERSIST = {
  active: true, // 是否采用持久化策略
  reducerVersion: '1',  // reducer版本，如果版本不一致，将刷新整个持久化仓库
  storeConfig: {
    storage: AsyncStorage,  // 采用本地异步存储，react-native必须
    blacklist: persistentStoreBlacklist,  // 从根reducer获取黑名单，黑名单中的reducer不进行持久化保存
  }
};

export default REDUX_PERSIST;