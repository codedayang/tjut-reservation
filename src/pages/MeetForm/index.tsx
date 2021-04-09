import Taro, {useDidShow} from "@tarojs/taro";
import {Button, Form, Input, Picker, Text, View} from "@tarojs/components";
import './index.less'
import {login} from "../../service/api";
type Props = {

}
const MeetForm: Taro.FunctionComponent<Props> = (props) => {
  useDidShow(() => {
    // login({
    //   code: "123"
    // });
  })
  const handleSubmit = (e) => {
    console.log(e);
    // login({
    //   code: "123"
    // });
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
            range={["108","109","411"]}
            onChange={(e) => console.log(e)}
            className="form-item-right">
            <View>当前选择</View>
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
