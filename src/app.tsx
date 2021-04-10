import './app.less'
import Taro, {useDidShow} from "@tarojs/taro";
import {loginAndTokenOrRedirect} from "./service/request";
import {View} from "@tarojs/components";

const App: Taro.FunctionComponent<any> = (props) => {
  useDidShow(async () => {
    await loginAndTokenOrRedirect();
  });
  return (
    <View className="app-root">
      {props.children}
    </View>


  )
}
export default App;

