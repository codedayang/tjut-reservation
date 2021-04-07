import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import './index.less'
import IconFont from "../iconfont";

type Prop = {
  title: string;
  who: string;
  timeStr: string;
};
const MeetItem: Taro.FunctionComponent<Prop> = ({title, who, timeStr}) => {
  return (
    <View className="container">

      <View className="double-arrow">
        <IconFont name={"double-left-arrow"}/>
      </View>
      <View className="title-line">
        <View className="title">
          Name
        </View>
        <View className="status">
          未开始
        </View>
      </View>

      <View className="first-line">
        <View className="creator">
          <IconFont name={"creator"}/>
          <Text>创建者</Text>
        </View>
        <View className="meeting-name">
          <IconFont name={"meetingName"}/>
          <Text>会议室名称</Text>
        </View>
      </View>

      <View className="second-line">
        <IconFont name={"date"}/>
        <Text className={"date-easyread"}>明天</Text>
        <Text className={"time"}>15:00~16:00</Text>
      </View>


    </View>
  );
}

export default MeetItem;
