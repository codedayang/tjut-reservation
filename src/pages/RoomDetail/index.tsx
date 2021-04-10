import Taro, {useDidShow, useRouter} from "@tarojs/taro";
import {Button, Text, View} from "@tarojs/components";
import './index.less'
import {Day, getRevs, MeetingRoom} from "../../service/api";
import IconFont from "../../component/iconfont";
import Calendar from "../../component/Calendar";
import TimeLineF from "../../component/TimeLineF";
import {useState} from "react";


const RoomDetail: Taro.FunctionComponent = () => {
  const {params} = useRouter();
  const [date, setDate] = useState(
    new Date(parseInt(params.year!!), parseInt(params.month!!), parseInt(params.day!!)));
  const [monthData, setMonthData] = useState<Day[]>([]);
  const [roomData, setRoomData] = useState<MeetingRoom[]>([])

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

  const load = async () => {
    Taro.showLoading();
    const res = await getRevs({
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString()
    })
    setMonthData(res.data.day);
    setRoomData(res.data.meetingRoom);
    console.log(res.data.day)
    Taro.hideLoading();

  }


  useDidShow(async () => {
    await load()
  })

  const roomid = parseInt(params.roomid!!)


  const curRoom = roomData.find(it => it.roomid == roomid);


  return (
    <View className="room-detail-container">
      <View className="top-line"/>
      <View className="room-detail-header">
        <View className="header-left">
          <View className="title">
            {curRoom?.name}
          </View>
          <View className="time">
            <IconFont name={"date"} size={25} color={"#444444"}/>
            <View className="date-text">{curRoom?.date}</View>
            <View className="time-text">{curRoom?.time}</View>
          </View>
          <View className="remark">
            <View className="remark-text">备注: {curRoom?.remark}</View>
          </View>
        </View>
        <View className="header-right">
          <View
            className="rev-btn"
            onClick={() => {
              Taro.navigateTo({
                url: `../MeetForm/index?roomid=${roomid}&pdate=${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
              })
            }}>
            <Text>
              预约
            </Text>
          </View>
        </View>

      </View>

      <View className="center-line">
        <View className="line"/>
      </View>

      <Calendar
        date={date}
        onChange={handleCalendarChange}
        dayList={monthData}
      />
      <View className="time-line">
        <TimeLineF
          startHour={8}
          endHour={23}
          bar={
            monthData
              .find(it => parseInt(it.dayOfMonth) == date.getDate())?.meetingRoomInfo
              .find(it => it.roomid == roomid)?.bar
          }/>
      </View>

      <View className="meet-list">
        {monthData
          .find(it => parseInt(it.dayOfMonth) == date.getDate())?.meetingRoomInfo
          .find(room => room.roomid == roomid)?.meetingInfo.map(info => {
            return (
              <View
                className="meet-item-container"
                key={info.id}
                onClick={() => {
                  Taro.navigateTo({
                    url: `../MeetDetail/index?meetid=${info.id}`,
                  })
                  // Taro.eventCenter.once("acceptDataFromOpenedPage", (res) => {
                  //   console.log(res);
                  // })
                }}>
                <View className="blue-left-border">
                  <View className="name">{info.name}</View>
                  <View className="creator">
                    <IconFont name="creator" size={30} color={"rgba(68,68,68,0.7)"}/>
                    <View>{info.creator}</View>
                  </View>
                  <View className="date-time">
                    <IconFont name="date" size={30} color={"rgba(68,68,68,0.7)"}/>
                    <View>{info.date} {info.time}</View>
                  </View>
                </View>
              </View>
            );
          })
        }
      </View>

    </View>
  );
};

export default RoomDetail;
