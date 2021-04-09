import {View} from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import Calendar from "../../component/Calendar";
import {useState} from "react";
import TimeLine from "../../component/TimeLine";
import RoomItem from "../../component/RoomItem";
import MeetItem from "../../component/MeetItem";
import TimeLineCanvas from "../../component/TimeLineCanvas";
import MonthBar from "../../component/MonthBar";
import MeetInfo from "../../component/MeetInfo";

const Setting: Taro.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());

  const meetItemMock: MyReservationItem = {
    "id" : 1,
    "name" : "Name",
    "creator" : "创建者",
    "meetingName" : "会议室名称",
    "date" : "明天",
    "time" : "15:00 - 16:00",
    "status": "未开始"
  }

  return (
    <View className='index' style={{background: "#f0f0f0"}}>
      {/*<Calendar date={date} onChange={(date: Date) => {*/}
      {/*  setDate(date);*/}
      {/*}}/>*/}

      {/*<TimeLineCanvas*/}
      {/*  startHour={8}*/}
      {/*  endHour={23}*/}
      {/*  barList={[*/}
      {/*    {from: 15, to: 16}*/}
      {/*  ]}/>*/}
      {/*<RoomItem*/}
      {/*  name={"108"}*/}
      {/*  desc={"108会议室"}*/}
      {/*  imgUrl={""}*/}
      {/*  timeBar={[{from: 8, to: 18}]}/>*/}

      {/*<MeetItem*/}

      {/*  {...meetItemMock}/>*/}


      <MeetInfo {...meetItemMock} />
      {/*<MonthBar*/}
      {/*  months={[0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0]}*/}
      {/*  curDate={new Date()}*/}
      {/*  onSwitchMonth={(toYear, toMonth) => console.log(toYear, toMonth)}*/}
      {/*/>*/}
    </View>


  );
}

export default Setting;
