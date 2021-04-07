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
      c.height = res[0].height * dpr;

      ctx.scale(dpr, dpr);

      // 绘制文字

      const fontSize = 11;
      ctx.font = `${fontSize}px sans-serif`

      const {startHour, endHour} = props;

      const canvasWidth = res[0].width;
      console.log(canvasWidth);
      // const endTextWidth = ctx.measureText(endHour.toString()).width;

      const textBlockCount = endHour - startHour + 1;
      const perTextBlockWidth = (canvasWidth ) / textBlockCount;

      const hourList: string[] = [];
      for (let i = startHour; i <= endHour; i++) {
        hourList.push(i.toString());
      }
      const blockCenterXList: number[] = []

      for (let i = 0; i < textBlockCount; i++) {

        const leftBorder = perTextBlockWidth * i;
        const rightBorder = perTextBlockWidth * i + perTextBlockWidth;

        const textWidth = ctx.measureText(hourList[i]).width;
        const startX = leftBorder + (rightBorder - leftBorder) / 2 - (textWidth / 2)
        blockCenterXList.push(leftBorder + ((rightBorder - leftBorder) / 2));
        console.log(blockCenterXList);

        ctx.fillStyle = "#d1d1d1";
        ctx.fillText(hourList[i], startX, fontSize);
        // ctx.strokeRect(leftBorder, 0, rightBorder, fontSize);

        // console.log(hourList[i])
      }
      // ctx.fillText(endHour.toString(), perTextBlockWidth * textBlockCount, fontSize);

      // blockCenterXList.push(leftBorder + (rightBorder - leftBorder) / 2);

      // startXList.push()
      // 绘制条

      const fullBarStartX = blockCenterXList[0] + 1;
      const fullBarStartY = fontSize + 3;

      const fullBarHeight = fontSize * 3 / 4;
      const fullBarWidth = blockCenterXList[blockCenterXList.length - 1] - perTextBlockWidth / 2;

      ctx.strokeStyle = "#FFF";
      ctx.strokeRect(fullBarStartX, fullBarStartY, fullBarWidth, fullBarHeight)

      // 以百分比绘制阴影部分

      const bar = [
        {
          start: 0,
          end: 10
        },
        {
          start: 83.33,
          end: 100
        },
      ];

      bar.forEach(item => {
        const curBarStartX = fullBarStartX + fullBarWidth * item.start * 0.01;
        const curBarStartY = fontSize + 4;

        const curBarHeight = fullBarHeight;
        const curBarWidth = fullBarWidth * (item.end - item.start) * 0.01;

        ctx.fillStyle = "#a6a9ae";
        ctx.fillRect(curBarStartX, curBarStartY, curBarWidth, curBarHeight);
      })

      // ctx.fillText("01234567", 0, 200);
      // ctx.strokeRect(0, 0, 220, 200);
      // const {width} = ctx.measureText("01234567");
      // ctx.strokeRect(0, 182, width, 18)

      // console.log(ctx.measureText("01234567"));
    });
  })


  return (
    <View>
      <Canvas id="cvs" style="width: 100%; height: 24px;" type="2d"/>
    </View>
  );

};

export default TimeLineCanvas;
