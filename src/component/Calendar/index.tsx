import HandleBar from "./HandleBar";
import {Dispatch, SetStateAction, useState} from "react";
import Taro from "@tarojs/taro"
import {View, Text} from "@tarojs/components";
import './index.less'
import {getCalendarData, getCurrentWeek} from "./utils";
import IconFont from "../iconfont";

type Prop = {
  date: Date;
  onChange: (date: Date) => void;

};

const getWeekItem = (
  ymDate: Date,
  today: Date,
  weekList: Array<number>,
  onChange: (date: Date) => void,
  setCurDate: Dispatch<SetStateAction<Date>>
) => {
  return weekList.map((day, j) => {

    let cn = `calendar-item-button`;
    if (day == today.getDate() && ymDate.getMonth() == today.getMonth()) {
      cn += " today";
    }
    return day !== -1 ? (
      <View key={j} className={`calendar-item`} onClick={() => {
        setCurDate(new Date(ymDate.getFullYear(), ymDate.getMonth(), day));
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

  const [curDate, setCurDate] = useState(new Date());

  const calendarData = getCalendarData(ymDate);

  const [expanded, setExpanded] = useState(false);

  return (
    <View className="calendar-container">
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
              {getWeekItem(
                ymDate,
                curDate,
                getCurrentWeek(curDate, calendarData)!,
                onChange,
                setCurDate)}
            </View>
          ) : calendarData.map((weekList, i) => (
            <View key={i} className="calendar-row">
              {getWeekItem(
                ymDate,
                curDate,
                weekList,
                onChange,
                setCurDate)}
            </View>
          ))}

          <View
            className={`calendar-expand-toggle ${expanded ? "coll" : ""}`}
            onClick={() => {
              setExpanded(!expanded)
              onChange(new Date());
            }}
          >
            <IconFont name="expand" size={48} color="#5ea3ef"/>
          </View>
        </View>
      </View>

    </View>


  );
};

export default Calendar;
