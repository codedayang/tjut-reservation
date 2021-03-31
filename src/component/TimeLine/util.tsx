import {View} from "@tarojs/components";
import {Prop} from "./index";

export function lineItem(props: Prop) {
  const items: any[] = [];
  for (let i = props.startHour; i < props.endHour; i++) {
    let cn = "line-item-bar";
    if (props.barList.find(bar => {
      return i >= bar.from && i < bar.to;
    })) {
      cn += " selected"
    }
    items.push(
      <View className="line-item-container">
        <View className="line-item-text">
          {i}
        </View>
        <View className={cn}>

        </View>
      </View>
    )
  }
  items.push(
    <View className="line-item-container">
      <View className="line-item-text">
        {props.endHour}
      </View>
    </View>
  )
  return items

}
