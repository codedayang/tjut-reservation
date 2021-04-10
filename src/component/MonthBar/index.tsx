import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import "./index.less";
import {useState} from "react";
import IconFont from "../iconfont";

type Props = {
  months: number[];
  curDate: Date;
  onSwitchMonth: (toYear: number, toMonth: number) => void; //月份从零开始
};
const MonthBar: Taro.FunctionComponent<Props> = ({months, curDate, onSwitchMonth}) => {
  const [selectedMonth, setSelectedMonth] = useState(curDate.getMonth());
  const [curYear, setCurYear] = useState(curDate.getFullYear());

  const handleClick = (i) => {
    if (i > todayMonth) {
      return;
    }
    setSelectedMonth(i);
    onSwitchMonth(curYear, i);
  }

  const handleClickYear = (direction: "left" | "right") => {
    if (direction == "left") {
      setCurYear(curYear - 1);
      setSelectedMonth(11);
      onSwitchMonth(curYear - 1, 11);
    } else {
      if (curYear >= curDate.getFullYear()) {
        return;
      }
      setCurYear(curYear + 1);
      setSelectedMonth(0);
      onSwitchMonth(curYear + 1, 0);
    }
  }

  const todayMonth = curDate.getMonth();
  return (
    <View className="month-bar-container">

      <View className="year-bar">

        <View className="left-arrow" onClick={() => handleClickYear("left")}>
          <IconFont name={"arrow-left"} size={48} style={{margin: "0 auto"}}/>
        </View>
        <View className="year-text" >{curYear}年</View>
        <View className="right-arrow" onClick={() => handleClickYear("right")}>
          <IconFont name={"arrow-right"} size={48} style={{margin: "0 auto"}}/>
        </View>
      </View>

      <View className="month-bar">
        {months.map((count, i) => {
          let cn = "month"
          if (selectedMonth == i) {
            cn += " selected";
          } else if (i > todayMonth) {
            cn += " disabled"
          }
          return (
            <View className={cn} key={i} onClick={() => handleClick(i)}>
              <View className="month-title">{i + 1}月</View>
              <View className="month-count">{count}</View>
            </View>
          )
        })}
      </View>
    </View>

  );
};

export default MonthBar;
