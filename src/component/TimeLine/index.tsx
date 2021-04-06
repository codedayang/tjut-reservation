import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import "./index.less";
import {lineItem} from "./util";

export type BarItem = {
  from: number;
  to: number;
};
export type Prop = {
  startHour: number;
  endHour: number;
  barList: BarItem[];
};
const TimeLine: Taro.FunctionComponent<Prop> = (props) => {
  return (
    <View>
      <View className="line-items">
        {lineItem(props)}
      </View>
      <View className="line-foot">
        <Text className="line-foot-item">{`${props.startHour.toString().padStart(2, '0')}:00`}</Text>
        <Text className="line-foot-item">{`${props.endHour.toString().padStart(2, '0')}:00`}</Text>
      </View>
    </View>

  )
};

export default TimeLine;
