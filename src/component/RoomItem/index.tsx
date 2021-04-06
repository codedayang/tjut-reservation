import Taro from "@tarojs/taro";
import TimeLine, {BarItem} from "../TimeLine";
import {View} from "@tarojs/components";
import './index.less'

type Prop = {
  name: string;
  desc: string;
  imgUrl: string;
  timeBar: BarItem[];
};
const RoomItem: Taro.FunctionComponent<Prop> = ({name, desc, imgUrl, timeBar}) => {
  return (
    <View className="container">
      <View className="info">
        <View className="img">
          {name}
        </View>

        <View className="info-left">
          <View className="title">108</View>
          <View className="desc">108</View>
        </View>
      </View>

      <TimeLine
        startHour={8}
        endHour={23}
        barList={timeBar} />
    </View>
  );
}

export default RoomItem;
