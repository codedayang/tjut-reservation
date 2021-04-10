import Taro from '@tarojs/taro';
import { baseUrl } from '../config';
import {login} from "./api";
import * as url from "url";


let onr = false;

export const loginAndTokenOrRedirect = async () => {
  const {code} = await Taro.login();
  const res = await login({code: code});
  Taro.setStorageSync("token", res.data.token);
  // return res.data.needAuth;
    if (res.data.needAuth) {
      await Taro.navigateTo({
        url: "../UserAuth/index"
      });
      return true;
    }

  return false;
}

const rspInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then((res) => {
    // console.log(requestParams);
    // if (res.data.code != "A0220") {
    if (res.data.code == "A0400" || res.data.code == "A0220") {
      if (!onr) {
        onr = true;
        loginAndTokenOrRedirect().then((stop) => {
          onr = false;
          if (stop) {
            // console.log("stop")
            return;
          }
          console.log(url)
          if (requestParams.url.includes("login")) {
            // console.log("skipped")
            return;
          }

          return Taro.request(requestParams).then(r => {
            requestParams.success = null;
            // console.log(requestParams)
            // onr = false;
            // return r;
          });

        });
      }

    } else if (res.data.code == "A0400") {
      return Promise.reject('请求出错');
    } else if (res.data.code != "00000") {
      return Promise.reject('请求出错');
    } else {
      return res.data;
    }
  });
}

Taro.addInterceptor(rspInterceptor);

interface OptionsType<T> {
  method: 'GET' | 'POST';
  data: T;
  url: string;
}
export default <REQ, RES> (options: OptionsType<REQ>) => {

  return new Promise<RES>(((resolve, _) => {
    Taro.request<RES, REQ>({
      url: baseUrl + options.url,
      data: {
        ...options.data,
        token: Taro.getStorageSync('token')
      },
      header: {
        'Content-Type': 'application/json'
      },
      // @ts-ignore
      method: options.method.toUpperCase(),
      success: (result) => {
        resolve(result.data);
      }
    });
  }));

};
