import Taro from '@tarojs/taro';
import {baseUrl} from '../config';
import {login} from "./api";

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

const rspInterceptor = async (chain) => {
  const requestParams = chain.requestParams;
  const res = await chain.proceed(requestParams);
  if (res.data.code == "A0400") {
    return Promise.reject('请求出错');
  } else if (res.data.code != "00000") {
    Taro.hideLoading();
    Taro.showToast({
      title: "请求失败: " + res.message,
      icon: "none"
    })
    return Promise.reject('请求出错');
  } else {
    return res.data;
  }
}

Taro.addInterceptor(rspInterceptor);

interface OptionsType<T> {
  method: 'GET' | 'POST';
  data: T;
  url: string;
}

const realRequest  = <REQ, RES> (options: OptionsType<REQ>) => {
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
}

export default async <REQ, RES>(options: OptionsType<REQ>) => {
  const token = Taro.getStorageSync('token');
  if (!options.url.includes("login") && (!token || token == "")) {
    // console.log("1");
    await loginAndTokenOrRedirect();
  }
  return await realRequest<REQ, RES>(options)
};
