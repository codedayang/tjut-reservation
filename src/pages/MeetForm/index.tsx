import Taro, {useDidShow} from "@tarojs/taro";
import {Button, Form, Input, Picker, Text, View} from "@tarojs/components";
import './index.less'
import {getRevs, MeetingRoom, postRev} from "../../service/api";
import {useState} from "react";
type Props = {

}

const Rooms = [

]
const MeetForm: Taro.FunctionComponent<Props> = (props) => {
  const [roomList, setRoomList] = useState<MeetingRoom[]>([]);

  const [roomText, setRoomText] = useState("请选择会议室");

  useDidShow(async () => {
    Taro.showLoading();
    const date = new Date();
    const res = await getRevs({
      year: (date.getFullYear()).toString(),
      month: (date.getMonth() + 1).toString()
    });

    setRoomList(res.data.meetingRoom);
    Taro.hideLoading()
  })
  const handleSubmit = (e) => {
    console.log(e);
    // login({
    //   code: "123"
    // });
    Taro.showLoading();
    postRev({
      content: "",
      date: "",
      endTime: "",
      name: "",
      roomId: 0,
      startTime: "",
      token: ""
    })
  }

  return (
    <View className="container">
      <Form onSubmit={handleSubmit} className="meet-form">
        <View className="form-item">
          <Text className="form-item-left">会议名称</Text>
          <Input type='text' placeholder='必填' className="form-item-right"/>
        </View>
        <View className="divider"/>

        <View className="form-item">
          <Text className="form-item-left">会议室</Text>
          <Picker
            mode="selector"
            range={roomList.map(it => it.name)}
            onChange={(e) => {
              console.log(e)
              setRoomText(e.detail.value.toString())
            }}
            className="form-item-right">
            <View>{roomText}</View>
          </Picker>
        </View>
        <View className="divider"/>
        <View className="form-item">
          <Text className="form-item-left">日期</Text>
          <Picker
            mode="date"
            value={""}
            onChange={(e) => console.log(e)}
            className="form-item-right">
            <View>当前选择</View>
          </Picker>
        </View>
        <View className="divider"/>
        <View className="form-item">
          <Text className="form-item-left">时间</Text>
          <Picker
            mode="time"
            value={""}
            onChange={(e) => console.log(e)}
            className="form-item-right">
            <View>当前选择</View>
          </Picker>
        </View>
        <View className="divider"/>
        <View className="form-item">
          <Text className="form-item-left">会议内容</Text>
          <Input type='text' placeholder='必填' className="form-item-right"/>
        </View>
        <View className="divider"/>
        <Button formType={"submit"} type="primary" style={{margin: "16px"}}>创建</Button>

      </Form>
    </View>
  )
}

export default MeetForm;
