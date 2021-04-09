import {Button, View} from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import {login} from "../../service/api";

const UserAuth: Taro.FunctionComponent = () => {

  return (
    <View className='container' style={{background: "#f0f0f0"}}>
      <View className="login-hint">
        欢迎使用SCSE会议室预约小程序
      </View>
      <Button
        className="login-button"
        onClick={() => {
          Taro.getUserProfile({
            desc: "你猜",
            success: (result => {
              console.log(result);
              login({
                code: "123"
              });
            }),
            fail: (res => {
              console.log("未授权")
            })
          });
        }}>
        微信登录
      </Button>

    </View>


  );
}

export default UserAuth;
