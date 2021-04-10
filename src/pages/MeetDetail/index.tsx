import Taro, {useRouter, useDidShow, getCurrentPages} from "@tarojs/taro";
import {Image, View} from "@tarojs/components";
import {getRev, GetRevRes} from "../../service/api";
import {useState} from "react";
import MeetInfo from "../../component/MeetInfo";

const MeetDetail: Taro.FunctionComponent = () => {

  const {params} = useRouter();
  const meetId = params.meetid;
  useDidShow(async () => {
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
      <MeetInfo
        {...data?.data!}
        status="未开始"
      />

      <View>
        <View>会议内容</View>
        <View>{data?.data.content}</View>
      </View>

      <View>
        <View>参会人员</View>
        <View>
          {data?.data.participant.map(p => {
            return (
              <View>
                <Image src={p.avatarUrl}/>
                <View>{p.nickName}</View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default MeetDetail;

