
import {View} from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro'
import Calendar from "../../component/Calendar";
import {useState} from "react";

const Index: Taro.FunctionComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View className='index'>
      <Calendar date={date} onChange={(date: Date) => {
        setDate(date);
      }}/>


    </View>




  );
}

export default Index;
