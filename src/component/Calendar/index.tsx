import HandleBar from "./HandleBar";
import {useState} from "react";
import {View, Text} from "@tarojs/components";
import './index.less'
import {getCalendarData} from "./utils";

type Prop = {
  onChange: (date: Date) => void;

};

const Calendar: Taro.FunctionComponent<Prop> = (props) => {

  const [ymDate, setYmDate] = useState(new Date());
  const calendarData = getCalendarData(ymDate);

  return (
    <View>
      <HandleBar
        ymDate={ymDate}
        onChange={(date) => {
          setYmDate(date);
        }}
      />

      <View>
        <View>
          <View className="calendar-head">
            {["一", "二", "三", "四", "五", "六", "日"].map(item => (
              <Text key={item}>
                {item}
              </Text>
            ))}
          </View>

          {calendarData.map((weekList, i) => (
            <View key={i}>
              {weekList.map((day, j) => {

              })}
            </View>
          ))}


        </View>
      </View>

    </View>





  );
}

export default Calendar;
