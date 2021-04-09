import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';
import interceptors from './interceptors';
import {login} from "../service/apiService";

// interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

interface OptionsType<T> {
  method: 'GET' | 'POST' | 'PUT';
  data: T;
  url: string;
  noLoading?: boolean;
}
export default <REQ, RES> (options: OptionsType<REQ>) => {
  if (!options.noLoading) {
    Taro.showLoading({
      title: '加载中',
    });
  }
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 URL=${options.url} 】PARAM=${JSON.stringify(options.data)}`);
  }
  // for (const key in options.data) {
  //   if (options.data.hasOwnProperty(key) && (options.data[key] === undefined || options.data[key] == null)) {
  //     delete options.data[key];
  //   }
  // }

  let token = Taro.getStorageSync('token');
  if (token == undefined) {
    // login(Taro.lo)
    Taro.redirectTo({
      url: "pages/UserAuth/index"
    })
  }

  return new Promise(((resolve, _) => {
    Taro.request<RES, REQ>({
      url: baseUrl + options.url,
      data: {
        ...options.data
      },
      header: {
        'token': Taro.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      // @ts-ignore
      method: options.method.toUpperCase()
    }).then((res) => {
      setTimeout(() => {
        Taro.hideLoading();
      }, 100);


      if (!noConsole) {
        // console.log(res);
        console.log(`${new Date().toLocaleString('zh', {hour12: false})}【${options.url} 】【返回】`, res);
      }

      resolve(res);
    });
  }));

};
