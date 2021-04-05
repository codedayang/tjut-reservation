import {View} from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import Calendar from "../../component/Calendar";
import {useState} from "react";
import TimeLine from "../../component/TimeLine";
import RoomItem from "../../component/RoomItem";
import MeetItem from "../../component/MeetItem";

const Index: Taro.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View className='index' style={{background: "#f0f0f0"}}>
      <Calendar date={date} onChange={(date: Date) => {
        setDate(date);
      }}/>

      <TimeLine
        startHour={8}
        endHour={23}
        barList={[
          {from: 15, to: 16}
        ]}/>
      <RoomItem
        name={"108"}
        desc={"108会议室"}
        imgUrl={""}
        timeBar={[{from: 8, to: 18}]}/>

      <MeetItem title="测试会议" who="123" timeStr="2021年3月24日"/>

    </View>


  );
}

export default Index;
