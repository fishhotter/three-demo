require("whatwg-fetch");
import CommonFunc from "./common-func";
import { CURRENT_VERSION } from "./global-const";
import { IResponse } from "./declare";

interface IResJson {
  code?: number,
  data?: object | null | undefined,
  msg?: string | null | undefined,
  message?: string | null | undefined,
}
interface IConCurrentParam {
  api: string,
  body: object
}

let host = "http://30.99.137.231:18580";
// let host = "http://30.99.138.175:50001"; // Login test
let userHost = "http://30.99.142.7:50001"; // Login debug

if (process.env.NODE_ENV === "production") {
  host = "";
  userHost = "";
}

const defaultHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "userType": "2", // 用户类型1:公众用户,2:内部用户,3:外部用户（必须）
  // "clientType": "1", // 客户端类型1:PC端,2:大屏端,3:手机安卓端,4:手机苹果端,...,不传默认为PC端（非必须）
  // "clientVersion": "2" // 版本控制
};

interface IApiFetch {
  host: string,
  userHost: string,
  get: (url: string, param?: object, needDefaultParam?: boolean, header?: object) => Promise<any>,
  post: (url: string, param?: object, header?: object, isConCurrent?: boolean) => Promise<any>,
  upload: (url: string, param?: object, header?: object) => Promise<any>,
  put: (url: string, param?: object, header?: object) => Promise<any>,
  delete: (url: string, param?: object, header?: object) => Promise<any>,
  conCurrentPost: (postParams: IConCurrentParam | IConCurrentParam[], headers?: object) => Promise<any>
}

const ApiFetch: IApiFetch = {
  host,
  userHost,
  get: async (url, param = {}, needDefaultParam = true, header = JSON.parse(JSON.stringify(defaultHeaders))) => {
    const params = getParams(url, param);
    let api = getApi(url, params);
    if (params && typeof params === "object" && needDefaultParam) {
      const paramsArray: string[] = [];
      Object.keys(params).forEach(key =>
        paramsArray.push(`${key}=${params[key]}`)
      );
      if (api.search(/\?/) === -1) {
        api += `?${paramsArray.join("&")}`;
      } else {
        api += `&${paramsArray.join("&")}`;
      }
    }
    return doFetch(api, "GET", "{}", header);
  },
  post: async (url, param = {}, header = JSON.parse(JSON.stringify(defaultHeaders)), isConCurrent = false) => {
    const params = getParams(url, param);
    const api = CURRENT_VERSION.gateway + getApi(url, params);
    const body = typeof params === "object" ? JSON.stringify(params) : params;
    return doFetch(api, "POST", body, header, isConCurrent);
  },
  upload: async (url, param, header = {}) => {
    const params = getParams(url, param);
    const api = getApi(url, params);
    const body = typeof params === "object" ? JSON.stringify(params) : params;
    return doFetch(api, "POST", body, header);
  },
  put: async (url, param, header = JSON.parse(JSON.stringify(defaultHeaders))) => {
    const params = getParams(url, param);
    const api = getApi(url, params);
    const body = typeof params === "object" ? JSON.stringify(params) : params;
    return doFetch(api, "PUT", body, header);
  },
  delete: async (url, param, header = JSON.parse(JSON.stringify(defaultHeaders))) => {
    const params = getParams(url, param);
    const api = getApi(url, params);
    const body = typeof params === "object" ? JSON.stringify(params) : params;
    return doFetch(api, "DELETE", body, header);
  },
  /*
  eg: ApiFetch.conCurrentPost([ {api: api1, body: body1}, ... ])
          .then(result => console.log(result))
          .catch(err => console.log(err));
  */
  conCurrentPost: async (postParams, headers = JSON.parse(JSON.stringify(defaultHeaders))) => {
    const params = postParams instanceof Array ? postParams : [postParams];
    return new Promise<object>( (resolve: any, reject: any) => {
      Promise.all(
        params.map( async (param: IConCurrentParam) =>
          ApiFetch.post(param.api, param.body, headers, true)
        ))
      .then( (result: any) => resolve(result) )
      .catch(err => reject(err))
    });
  }
};

const handleResponse = (response: any, resolve: any, reject: any, method: any = "POST", isConCurrent = false) => {
  /* 这里后端返回值中使用code作为判断依据，code值为0成功，其他值需于后端确认。
   * 若不使用code，_success根据response.ok的值来确认，错误代码判断根据response.status判断
   */
  return response.json().then((json: IResJson) => {
    const result: IResponse = method === "GET" ? json : {
      _success: json.code === 0,
      data: json.data,
      status: response.status,
      statusText: response.statusText,
      code: json.code,
      message: json.msg || json.message,
      getContent: json,
    };
    // TODO: 在下方通过if或switch进行各种已知错误代码code处理
    // code = 20012 尚未登录
    if (json.code && json.code === 20012) {
      isConCurrent ? resolve({ code: -1 }) : reject(result);
    }
    resolve(result);
  });
};

const handleCatch = (err: any, reject: any) => {
  let error = err;
  if (typeof err === "object") {
    console.error(err.message);
  } else {
    console.error(err);
    error = { _success: false, message: err };
  }
  reject(error);
  return error;
};

const doFetch = async (api: string, method: string, body: string | undefined, header: any, isConCurrent: boolean = false) =>
  new Promise<object>((resolve: any, reject: any) => {
    //  公共的url
    let url;
    const hostTemp = api.startsWith("/bizunit1/api/user") ? ApiFetch.userHost : ApiFetch.host
    body && JSON.parse(body).baseUrl
      ? url = `${hostTemp}${JSON.parse(body).baseUrl}`
      : url = api.startsWith("http") ? api : `${hostTemp}${api}`;
    const options: RequestInit = {
      method,
      headers: new Headers({ ...header, "tkUserToken": CommonFunc.getCookie("token") }),
    };
    fetch(url, method === "GET" ? options : { ...options, body })
      .then(response => response)
      .then(response => handleResponse(response, resolve, reject, method, isConCurrent))
      .catch(err => isConCurrent ? resolve({ code: -1 }) : handleCatch(err, reject));
  });

// 将URL中的参数名替换成对应的值
const getApi = (url: string, params: object | undefined) => {
  if (!params || typeof params !== "object") { return url; }
  const api = Object.keys(params)
    .reduce((accUrl, key) => {
      const keyReg = new RegExp(`:${key}\\??`);
      return accUrl.replace(keyReg, params[key]);
    }, url.trim())
    .replace(/\/:([\w]*)\??/g, "");
  return api;
};

// 请求中添加version和url
const getParams = (url: string, param: object | undefined) => {
  if (typeof param !== "object") { return param; }
  return {
    version: CURRENT_VERSION.version,
    method: url,
    ...param,
  };
};

export default ApiFetch;