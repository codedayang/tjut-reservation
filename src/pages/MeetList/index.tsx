import {View} from '@tarojs/components'
import './index.less'
import Taro, {useDidShow} from '@tarojs/taro'
import Calendar from "../../component/Calendar";
import {useState} from "react";
import TimeLine from "../../component/TimeLine";
import RoomItem from "../../component/RoomItem";
import MeetItem from "../../component/MeetItem";
import TimeLineCanvas from "../../component/TimeLineCanvas";
import MonthBar from "../../component/MonthBar";
import MeetInfo from "../../component/MeetInfo";
import {Day, getRevs, MeetingRoom} from "../../service/api";
import TimeLineF from "../../component/TimeLineF";

const MeetList: Taro.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Day[]>([]);
  const [roomData, setRoomData] = useState<MeetingRoom[]>([])

  useDidShow(async () => {
    await load()
  })

  const load = async () => {
    Taro.showLoading();
    const res = await getRevs({
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString()
    })
    setMonthData(res.data.day);
    setRoomData(res.data.meetingRoom);
    // setDate(new Date());
    // console.log(res.data.day)
    Taro.hideLoading();

  }
  const handleCalendarChange = async (cdate: Date) => {
    let reload = false;
    if (cdate.getMonth() != date.getMonth()) {
      reload = true;
    }
    setDate(cdate);
    if (reload) {
      await load();
    }
  }

  const today = monthData.find(it => parseInt(it.dayOfMonth) == date.getDate());
  // console.log(today)
  return (
    <View className='meet-list-container' style={{background: "#f0f0f0"}}>
      <Calendar
        date={date}
        onChange={handleCalendarChange}
        dayList={monthData}
      />

      <View className="room-list">
        {today?.meetingRoomInfo.map((item, index) => {
          return (
            <View className="room-list-item" onClick={() => {
              Taro.navigateTo({
                url: `../RoomDetail/index?roomid=${item.roomid}&year=${date.getFullYear()}&month=${date.getMonth()}&day=${today.dayOfMonth}`
              })
            }}>
              <RoomItem
                {...roomData.find(it => it.roomid == item.roomid)!!}
                bar={item.bar} index={index}/>
            </View>


          )
        })}
      </View>


    </View>


  );
}

export default MeetList;
