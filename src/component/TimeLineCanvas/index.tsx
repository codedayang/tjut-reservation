import Taro, {useReady} from "@tarojs/taro";
import {Prop} from "../TimeLine";
import {Canvas, View} from "@tarojs/components";

const TimeLineCanvas: Taro.FunctionComponent<Prop> = (props) => {


  useReady(() => {
    Taro.createSelectorQuery().select("#cvs").fields(
      {
        node: true,
        size: true
      }
    ).exec((res) => {
      const c = res[0].node;
      const ctx = c.getContext("2d");

      const dpr = Taro.getSystemInfoSync().pixelRatio;
      c.width = res[0].width * dpr;
      c.height = res[0].height  * dpr;

      ctx.scale(dpr, dpr);

      const fontSize = 18;
      ctx.font = `${fontSize}px sans-serif`

      ctx.fillText("01234567", 0, 200);
      ctx.strokeRect(0, 0, 220, 200);
      ctx.strokeRect(0, 182, 80, 18)
      console.log(ctx.measureText("01234567"));
    })
  })


  return (
    <View>
      <Canvas id="cvs" style="width: 100%; height: 100vh;" type="2d"/>
    </View>
  );

};

export default TimeLineCanvas;
