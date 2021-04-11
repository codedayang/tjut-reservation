import Taro, {useRouter, useDidShow, getCurrentPages} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {getRev, GetRevRes} from "../../service/api";
import {useState} from "react";
import MeetInfo from "../../component/MeetInfo";
import "./index.less"
import {loginAndTokenOrRedirect} from "../../service/request";

const MeetDetail: Taro.FunctionComponent = () => {

  const {params} = useRouter();
  const meetId = params.meetid;
  useDidShow(async () => {
    await loginAndTokenOrRedirect();
    Taro.showLoading();
    const res = await getRev({
      id: parseInt(meetId!)
    })
    Taro.hideLoading();

    if (res.code == "A0300") {
      Taro.showToast({
        title: res.message,
        icon: "none",
        duration: 500
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 500)
    }
    // const pages = getCurrentPages();
    // const current = pages[pages.length - 1];
    // const channel = current.getOpenerEventChannel();
    // channel.emit("acceptDataFromOpenedPage", {d: "ok"})
    //
    //
    // Taro.navigateBack();
    setData(res);
    // console.log(res);
  })

  const [data, setData] = useState<GetRevRes>();

  return (
    <View className="meet-detail-container">
      <View className="meet-info">
        <MeetInfo
          {...data?.data!}
        />
      </View>


      <View className="meet-content">
        <View className="content-title">会议内容</View>
        <View className="divider"/>
        <View className="content-text">{data?.data.content}</View>
      </View>

      <View className="meet-ptc">
        <View className="ptc-title">参会人员 ({data?.data.participant.length})</View>
        {/*<View className="divider"/>*/}
        <View className="ptc-list">
          {data?.data.participant.map(p => {
            return (
              <View className="list-item">
                <Image src={p.avatarUrl} className="avatar"/>
                <View className="nickName">{p.nickName}</View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default MeetDetail;

