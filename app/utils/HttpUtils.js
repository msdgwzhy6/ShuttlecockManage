/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 17-10-31
 * Time: 下午2:49
 * Desc: 网络请求模块封装
 */

import {Toast} from "antd-mobile";
<<<<<<< HEAD
import {config} from '../config'
=======
>>>>>>> b26c28bf68512a363fc4e22f83167ad70db19585

function handelError(err) {
  Toast.fail(err);
}

/**
 * 请求之前处理
 * @param method
 * @param body
 * @param headers
 */
function beforeRequest(method, params, headers) {
  if (method === 'POST' || method === 'PUT') {
    let body = JSON.stringify(params);
    if (headers['Content-Type'] === 'multipart/form-data') {
      body = params;
    }
    params = {body: body};
  }
  //认证header添加
  // const {user} = store.getState().auth;
  let authHeaders = {
    "X-Auth-Token": 'token',
    "X-User-Id": 'userId',
  };
  return {params, authHeaders};
}

/**
 * 通用请求
 * @param method
 * @param url
 * @param body
 * @param headers
 * @returns {Promise}
 */
function request(method, url, oldParams = {}, headers = {}) {
<<<<<<< HEAD
  const {server} = config //store.getState().app.cfg;
=======
  const {server} = ''//store.getState().app.cfg;
>>>>>>> b26c28bf68512a363fc4e22f83167ad70db19585

  return new Promise((resolve, reject) => {
    let {params, authHeaders} = beforeRequest(method, oldParams, headers);

<<<<<<< HEAD
    console.log('请求参数:', method, url, params, authHeaders);

    fetch(server + url, {
=======
    log('请求参数:', method, url, params, authHeaders);

    fetch(url, {
>>>>>>> b26c28bf68512a363fc4e22f83167ad70db19585
      method: method,
      headers: {
        "X-Api-Key": "06a6af829ad9c8d028727117",
        ...authHeaders,
        ...headers
      },
      ...params
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "status:" + response.status;
      }
    }).then((response) => {
      // if (!response.success && response.message === '用户未登录') {
      //   toast('登录已过期,请重新登录', 'danger');
      //   store.dispatch(logout());
      //   return;
      // }
      resolve(response);
    }).catch((err) => {
      handelError("请求异常:" + err);
      reject("请求异常:" + err);
    })
  });
}

const http = {
  /**
   * 基于fetch封装的get请求
   * @param url {url: string} | string
   * @param params
   * @param headers
   */
  get (url, params) {
    if (params) {
      let paramsArray = [];
      //encodeURIComponent
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return request('GET', url);
  },

  /**
   * 基于 fetch 封装的 json post请求
   * @param url
   * @param formData
   * @param headers
   * @returns {Promise}
   */
  postJson(url, params, headers) {
    return request('POST', url, params, {
      ...headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
  },

  /**
   * 基于 fetch 封装的 json put请求
   * @param url
   * @param formData
   * @param headers
   * @returns {Promise}
   */
  putJson(url, params, headers) {
    return request('PUT', url, params, {
      ...headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
  },

  /**
   * 删除服务器资源
   * @param url
   * @returns {Promise}
   */
  delete(url) {
    return request('Delete', url);
  },

  /**
   * 基于 fetch 封装的 文件上传请求
   * @param uri
   * @param name
   * @param headers
   * @returns {Promise}
   */
  postImg(uri, name, headers) {
    let formData = new FormData();
    let file = {uri: uri, type: 'multipart/form-data', name: name};
    formData.append("file", file);
    return request('POST', `file/?name=${name}`, formData, {
      ...headers,
      'Content-Type': 'multipart/form-data'
    });
  }
};

export default http;


/**
 * 延时搜索 防止频繁请求
 * @param milliseconds 需要延时的毫秒数
 */
export function delayedSearch(callback, milliseconds = 500) {
  clearTimeout(http.timer);
  http.timer = setTimeout(_ => callback && callback(), milliseconds)
}

