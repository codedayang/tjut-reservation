import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import './index.less'
import TimeLineCanvas from "../TimeLineCanvas";
import {Bar, MeetingRoom} from "../../service/api";
import TimeLineF from "../TimeLineF";

type Prop = MeetingRoom & {bar: Bar[]}
;
const RoomItem: Taro.FunctionComponent<Prop> =
  ({name, date, time , remark, bar }) =>
  {
    return (
      <View className="container">
        <View className="info">
          <View className="img">
            {name}
          </View>

          <View className="info-left">
            <View className="title">{name}</View>
            <View className="desc">{remark}</View>
          </View>
        </View>


        <TimeLineF
          startHour={8}
          endHour={23}
          bar={bar} />
        {/*<TimeLineCanvas*/}
        {/*  startHour={8}*/}
        {/*  endHour={23}*/}
        {/*  bar={bar}/>*/}
      </View>
    );
}

export default RoomItem;
