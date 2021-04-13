import './app.less'
import Taro, {useDidShow, useReady} from "@tarojs/taro";
import {loginAndTokenOrRedirect} from "./service/request";
import {View} from "@tarojs/components";

const App: Taro.FunctionComponent<any> = (props) => {
  useDidShow(async () => {

  });
  useReady(async () => {
    Taro.showLoading();
    await loginAndTokenOrRedirect();
    Taro.hideLoading();
  })
  return (
    <View className="app-root">
      {props.children}
    </View>


  )
}
export default App;

