import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import "./index.less";

type Props = {
  months: number[];
}
const MonthBar: Taro.FunctionComponent<Props> = ({months}) => {
  return (
    <View className="container">

      <View className="month-bar">
        {months.map((count, i) => (
          <View className="month selected" key={i}>
            <View className="month-title">{i + 1}月</View>
            <View className="month-count">{count}</View>
          </View>
        ))}
      </View>
    </View>

  );
};

export default MonthBar;
