import HandleBar from "./HandleBar";
import {Dispatch, SetStateAction, useState} from "react";
import Taro, {useDidShow, useReady} from "@tarojs/taro"
import {View, Text} from "@tarojs/components";
import './index.less'
import {getCalendarData, getCurrentWeek} from "./utils";
import IconFont from "../iconfont";
import {Day} from "../../service/api";

type Prop = {
  initDate: Date,
  date: Date;
  onChange: (date: Date) => void;
  dayList: Day[]

};

const getWeekItem = (
  initDate: Date,
  ymDate: Date,
  today: Date,
  weekList: Array<number>,
  onChange: (date: Date) => void,
  setCurDate: Dispatch<SetStateAction<Date>>,
  dayList: Day[]
) => {
  return weekList.map((day, j) => {

    let cn = `calendar-item-button`;
    if (day == today.getDate() && ymDate.getMonth() == today.getMonth()) {
      cn += " today";
    }
    // 仅可预约本周
    // 将范围外的日期样式设为禁用
    let disabled = false;
    if (day > initDate.getDate() + 7
      || day < initDate.getDate()
      || ymDate.getMonth() > initDate.getMonth()
      || ymDate.getMonth() < initDate.getMonth()) {
      cn += " disabled"
      disabled = true;
    }
    return day !== -1 ? (
      <View key={j} className={`calendar-item`} onClick={() => {
        if (disabled) return;
        setCurDate(new Date(ymDate.getFullYear(), ymDate.getMonth(), day));
        onChange(new Date(ymDate.getFullYear(), ymDate.getMonth(), day));
      }}>
        <View className="calendar-item-button-around">
          <View className={cn}>
            {day}
          </View>
          <Text className="calendar-item-mark">{dayList.find(it => parseInt(it.dayOfMonth) == day)?.count}</Text>
        </View>
      </View>
    ) : (
      <View key={j} className={`calendar-item`}>
      </View>
    );
  })
}

const Calendar: Taro.FunctionComponent<Prop> = (
  {
    initDate,
    date,
    onChange,
    dayList
  }) => {
  const [ymDate, setYmDate] = useState(date);

  const [curDate, setCurDate] = useState(date);
  // console.log(curDate);

  useReady(() => {
    setCurDate(date);
    onChange(date);
    console.log(date);
  })
  useDidShow(() => {

  })

  const calendarData = getCalendarData(ymDate);

  const [expanded, setExpanded] = useState(true);

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
                initDate,
                ymDate,
                curDate,
                getCurrentWeek(curDate, calendarData)!,
                onChange,
                setCurDate,dayList)}
            </View>
          ) : calendarData.map((weekList, i) => (
            <View key={i} className="calendar-row">
              {getWeekItem(
                initDate,
                ymDate,
                curDate,
                weekList,
                onChange,
                setCurDate,dayList)}
            </View>
          ))}

          <View
            className={`calendar-expand-toggle ${expanded ? "coll" : ""}`}
            onClick={() => {
              setExpanded(!expanded)

              // onChange(new Date());
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
