import Taro, {useDidShow, useRouter} from "@tarojs/taro";
import {Button, View} from "@tarojs/components";
import './index.less'
import MonthBar from "../../component/MonthBar";
import {useState} from "react";
import {Day, getMyRev, MeetingRoom, MeetingRoomInfo, MyMeetInfo} from "../../service/api";
import MeetItem from "../../component/MeetItem";
import IconFont from "../../component/iconfont";


const RoomDetail: Taro.FunctionComponent = () => {
  // useDidShow(async () => {
  //   Taro.showLoading();
  //
  //   Taro.hideLoading();
  //
  //
  // })
  const router = useRouter();
  console.log(param);

  const [days, setDays] = useState([]);
  const [rooms, setRooms] = useState(roomList);

  const [curDay, setCurDay] = useState(router.params.curDay);
  const roomid = router.params.roomid


  const curRoom = rooms.find(it => it.roomid == roomid);


  return (
    <View className="room-detail-container">
      <View className="room-detail-header">
        <View className="header-left">
          <View className="title">
            {curRoom?.name}
          </View>
          <View className="time">
            <IconFont name={"date"} size={26}/>
            <View className="time-text">{curRoom?.time}</View>
          </View>
          <View className="remark">
            <View className="remark-text">备注{curRoom?.remark}</View>
          </View>
        </View>
        <View className="header-right">
          <View className="rev-btn">
            预约
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomDetail;
