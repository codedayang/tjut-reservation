import './index.less'
import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
type ChangeType = "prev" | "next";

type Prop = {
  ymDate: Date;
  onChange: (ymDate: Date) => void;
};
const HandleBar: Taro.FunctionComponent<Prop> = ({ymDate, onChange}) => {
  const year = ymDate.getFullYear();
  const month = ymDate.getMonth();

  const onClick = (type: ChangeType) => {
    onChange(new Date(year, type === "prev" ? month - 1 : month + 1));
  }
  return (
    <View className="handle-container">
      <View
        className="handle-prev"
        onClick={() => {
          onClick("prev");
        }}>
        &lt;&lt;
      </View>

      <View className="handle-label">
        {year}年 {month+1}月
      </View>

      <View
        className="handle-next"
        onClick={() => {
          onClick("next");
        }}>
        &gt;&gt;
      </View>
    </View>

  );
};

export default HandleBar;
