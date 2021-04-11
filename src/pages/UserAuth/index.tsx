import {Button, Image, Input, View} from '@tarojs/components'
import './index.less'
import Taro, {useDidShow} from '@tarojs/taro'
import {loginAuth} from "../../service/api";
import {useState} from "react";
import logoPng from '../../images/logo.png'

const UserAuth: Taro.FunctionComponent = () => {
  const [name, setName] = useState("");
  useDidShow(() => {
  })
  const handleClick = async () => {
    if (name == "") {
      Taro.showToast({
        title: "请输入姓名",
        icon: "none"
      })
      return;
    }
    Taro.showLoading();
    try {
      const {userInfo} = await Taro.getUserProfile({desc: "用户信息"});
      console.log(userInfo);
      const {code} = await Taro.login();

      const {data} = await loginAuth({
        code: code,
        name: name,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      })
      Taro.setStorageSync("token", data.token);
      Taro.showToast({
        title: "登录成功"
      })
      Taro.navigateBack();

    } catch (e) {
      Taro.showToast({
        title: "登录失败",
        icon: "none"
      });
    }
    Taro.hideLoading();
  };
  return (
    <View className='auth-container'>


      <Image
        src={logoPng}
        mode="scaleToFill"
        className="logo"/>
      <View className="login-hint">
        欢迎使用
      </View>
      <View className="login-hint">
        SCSE会议室预约小程序
      </View>

      <View className="divider"/>

      <View>
        请输入您的姓名
      </View>

      <Input
        type={"text"}
        className="name-input"
        onInput={(e) => {
        setName(e.detail.value)
      }}>

      </Input>
      <Button
        className="login-button"
        onClick={handleClick}>
        微信登录
      </Button>

    </View>


  );
}

export default UserAuth;
