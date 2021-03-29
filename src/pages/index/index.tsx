
import { View, Text } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import Calendar from "../../component/Calendar";

const Index: Taro.FunctionComponent = () => {
  return (
    <View className='index'>
      <Calendar onChange={() => {

      }}/>
      <Text>Hello world!</Text>
    </View>
  );
}

export default Index;
