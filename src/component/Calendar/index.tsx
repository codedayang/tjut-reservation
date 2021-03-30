import HandleBar from "./HandleBar";
import {useState} from "react";
import Taro from "@tarojs/taro"
import {View, Text} from "@tarojs/components";
import './index.less'
import {getCalendarData, getCurrentWeek} from "./utils";

type Prop = {
  date: Date;
  onChange: (date: Date) => void;

};

const getWeekItem = (ymDate: Date, today: Date, weekList: Array<number>, onChange: (date: Date) => void) => {
  return weekList.map((day, j) => {

    let cn = `calendar-item-button`;
    if (day == today.getDate() && ymDate.getMonth() == today.getMonth()) {
      cn += " today";
    }
    return day !== -1 ? (
      <View key={j} className={`calendar-item`} onClick={() => {
        onChange(new Date(ymDate.getFullYear(), ymDate.getMonth(), day));
      }}>
        <View className={cn}>
          {day}
          <Text className="calendar-item-mark">1</Text>
        </View>
      </View>
    ) : (
      <View key={j} className={`calendar-item`}>
      </View>
    );
  })
}

const Calendar: Taro.FunctionComponent<Prop> = ({date, onChange}) => {
  const [ymDate, setYmDate] = useState(date);

  const calendarData = getCalendarData(ymDate);

  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <HandleBar
        ymDate={ymDate}
        onChange={(date) => {
          if (expanded) {
            Taro.showToast({
              title: "展开以调整月份",
              icon: "none"
            })
            return;
          }
          setYmDate(date);
        }}
      />

      <View>
        <View>
          <View className="calendar-head">
            {["一", "二", "三", "四", "五", "六", "日"].map(item => (
              <Text key={item} className="calendar-head-item">
                {item}
              </Text>
            ))}
          </View>

          {expanded ? (
            <View className="calendar-row">
              {getWeekItem(ymDate, date, getCurrentWeek(calendarData)!, onChange)}
            </View>
          ) : calendarData.map((weekList, i) => (
            <View key={i} className="calendar-row">
              {getWeekItem(ymDate, date, weekList, onChange)}
            </View>
          ))}

          <View
            className="calendar-expand-toggle"
            onClick={() => {
              setYmDate(new Date())
              setExpanded(!expanded)
              onChange(new Date());
            }}
          >
            <View
              className={`iconfont iconexpand ${expanded ? "coll" : ""}`}
              style={{
                fontSize: "24px",
                color: "#5ea3ef"
              }}/>
          </View>
        </View>
      </View>

    </View>


  );
};

export default Calendar;
