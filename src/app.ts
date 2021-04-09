import './app.less'
import Taro, {useDidShow} from "@tarojs/taro";
import {login} from "./service/api";

const App: Taro.FunctionComponent<any> = (props) => {
  useDidShow(() => {
    console.log("Reda")
    Taro.showLoading();
    Taro.login({
      success: result => {
        Taro.hideLoading()
        if (result.code) {

        } else {
          Taro.showToast({
            title: "登录失败"
          })
        }
      }
    })
    // Taro.getUserProfile({
    //   desc: "你猜"
    // })
    // Taro.showLoading();
    // Taro.authorize({
    //   scope: "scope.userInfo",
    //   success: res => {
    //     Taro.hideLoading();
    //     Taro.showToast({
    //       title: "成功"
    //     })
    //   },
    //   fail: res => {
    //     Taro.showToast({
    //       title: "失败"
    //     })
    //   }
    // })
    // setTimeout(() => {
    // }, 2100);
  })
  return (
    props.children
  )
}
export default App
