import {View} from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import Calendar from "../../component/Calendar";
import {useState} from "react";
import TimeLine from "../../component/TimeLine";
import RoomItem from "../../component/RoomItem";

const Index: Taro.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View className='index' style={{background: "#f0f0f0"}}>
      {/*<Calendar date={date} onChange={(date: Date) => {*/}
      {/*  setDate(date);*/}
      {/*}}/>*/}

      {/*<TimeLine*/}
      {/*  startHour={7}*/}
      {/*  endHour={23}*/}
      {/*  barList={[*/}
      {/*    {from: 15, to: 16}*/}
      {/*  ]}/>*/}
      <RoomItem
        name={"108"}
        desc={"108会议室"}
        imgUrl={""}
        timeBar={[]}/>

    </View>


  );
}

export default Index;
