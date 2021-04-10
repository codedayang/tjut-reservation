import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import "./index.less";
import {lineItem} from "./util";
import {Bar} from "../../service/api";

export type Prop = {
  startHour: number;
  endHour: number;
  barList: Bar[];
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
