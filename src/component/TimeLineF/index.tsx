import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {Bar} from "../../service/api";
import "./index.less"

type Props = {
  startHour: number;
  endHour: number;
  bar?: Bar[]
};


const TimeLineF: Taro.FunctionComponent<Props> = ({startHour, endHour, bar}) => {
  const items: any[] = [];
  for (let i = startHour; i <= endHour; i++) {
    items.push(
      <Text className={"line-item-text"}>{i.toString().padStart(2, "0")}</Text>
    )
  }

  const sec: any[] = [];
  // sec.push(
  //   <View className="bar-item" style={{width: "2.5%"}}/>
  // )

  let cur = 0;
  // let cur = 2.5;
  // console.log(bar);
  bar?.forEach(b => {
    sec.push(
      <View className="bar-item" style={{width: ((b.start - cur)*100).toString() + "%"}}/>
    );
    sec.push(
      <View className="bar-item-selected" style={{width: ((b.end - b.start)*100).toString() + "%"}}/>
    );
    cur = b.end;
  })
  sec.push(
    <View className="bar-item" style={{width: ((1 - cur)*100) + "%"}}/>
  )

  return (
    <View className="time-line-f-container">
      <View className="first-line">
        {items}
      </View>

      <View className="bar">
        {sec}
      </View>
      <View className="last-line">
        <Text className="last-line-item">8:00</Text>
        <Text className="last-line-item">23:00</Text>
      </View>
    </View>
  );
}

export default TimeLineF;
