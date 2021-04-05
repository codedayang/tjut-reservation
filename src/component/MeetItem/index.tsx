import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import './index.less'

type Prop = {
  title: string;
  who: string;
  timeStr: string;
};
const MeetItem: Taro.FunctionComponent<Prop> = ({title, who, timeStr}) => {
  return (
    <View className="container">
      <View className="title">
        {title}
      </View>

      <View className="who">
        {who}
      </View>

      <View className="timeStr">
        {timeStr}
      </View>

    </View>
  );
}

export default MeetItem;
