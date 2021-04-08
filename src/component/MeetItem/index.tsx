import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import './index.less'
import IconFont from "../iconfont";

type Prop = MyReservationItem;
const MeetItem: Taro.FunctionComponent<Prop> =
  ({
     id,
     name,
     creator,
     meetingName,
     date,
     time,
     status
  }) => {

    let statusClassname = "";
    switch (status) {
      case "未开始":
        statusClassname += "stand";
        break;
      case "进行中":
        statusClassname += "running";
        break;
      case "已结束":
        statusClassname += "ended";
    }
    return (
      <View className="container" key={id}>
        <View className="title-line">
          <View className="title">
            {name}
          </View>
          <View className={`status ${statusClassname}`}>
            {status}
          </View>
        </View>

        <View className="content">
          <View className="content-left">
            <View className="first-line">
              <View className="creator">
                <IconFont name={"creator"} size={26}/>
                <Text className="creator-text">{creator}</Text>
              </View>
              <View className="meeting-name">
                <IconFont name={"meetingName"} size={26}/>
                <Text className="meeting-name-text">{meetingName}</Text>
              </View>
            </View>

            <View className="second-line">
              <IconFont name={"date"} size={26}/>
              <Text className={"date-easyread"}>{date}</Text>
              <Text className={"time"}>{time}</Text>
            </View>
          </View>


          <View className="double-arrow">
            <IconFont name={"double-left-arrow"} size={38}/>
          </View>
        </View>



      </View>
    );
}

export default MeetItem;
