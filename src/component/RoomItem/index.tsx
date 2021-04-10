import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import './index.less'
import {Bar, MeetingRoom} from "../../service/api";
import TimeLineF from "../TimeLineF";
import IconFont from "../iconfont";

type Prop = MeetingRoom & {bar: Bar[], index: number}
;
const RoomItem: Taro.FunctionComponent<Prop> =
  ({name, date, time , remark, bar , index}) =>
  {
    return (
      <View className="container">
        <View className="info">
          <View className="img">
            {name}
          </View>

          <View className="info-left">
            <View className="title">{name}</View>
            <View className="date-time">
              <IconFont name="date" size={35} color={"#444444"}/>
              <View className="date">{date}</View>
              <View className="time">{time}</View>
            </View>
            <View className="desc">备注：{remark}</View>
          </View>

          <View className="info-left-left">
            <View className="index"><Text>{index+1}</Text></View>
            <View className="icon-double-left-arrow"><IconFont name="double-left-arrow" size={45} color={"#B5B5B5"}/></View>
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
