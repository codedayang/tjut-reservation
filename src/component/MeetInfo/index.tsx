import Taro from "@tarojs/taro";
import {Button, Text, View} from "@tarojs/components";
import './index.less'
import IconFont from "../iconfont";
import {deleteRev, MyMeetInfo, remindRev} from "../../service/api";
import {REMIND_TMPLS} from "../../config";
import {useState} from "react";
import InputModal from "../InputModal";

type Prop = {
  id: number;
  name: string;
  creator: string,
  meetingName: string,
  date: string,
  time: string,
  content: string;
  remind: boolean,
  isCreator: boolean;
  status: "未开始" | "进行中" | "已结束"
};
const MeetInfo: Taro.FunctionComponent<Prop> =
  ({
     id,
     name,
     creator,
     meetingName,
     date,
     time,
     status,
     content,
     isCreator,
     remind: initRemind
   }) => {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [remind, setRemind] = useState(initRemind)
    let statusClassname = "";
    switch (status) {
      case "未开始":
        statusClassname += "stand";
        break;
      case "进行中":
        statusClassname += "running";
        break;
      case "已结束":
        statusClassname += "ended";
    }
    console.log(isCreator);
    return (
      <View className="meet-info-container" key={id}>
        <View className="left">
          <View className="name">
            {name}
          </View>
          <View className="creator">
            <IconFont name={"creator"}/>
            <View className="creator-text">
              {creator}
            </View>
          </View>
          <View className="meeting-name">
            <IconFont name={"meetingName"}/>
            <View className="meeting-name-text">
              {meetingName}
            </View>
          </View>
          <View className="third-line">
            <IconFont name="date"/>
            <View className="time-line">
              <View className="date">
                {date}
              </View>
              <View className="time-status">
                <View className="time">
                  {time}
                </View>
                <View className={`status ${statusClassname}`}>
                  {status}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="row-line"/>
        <View className="right">
          <View className="row-1">
            <View
              className="meet-info-right-item"
              onClick={async () => {
                console.log(remind);
                if (remind) {
                  await remindRev({
                    id: id,
                    remind: false
                  });
                  await Taro.showToast({
                    title: "已取消提醒"
                  });
                  setRemind(false);
                } else {
                  await Taro.requestSubscribeMessage({
                    tmplIds: REMIND_TMPLS,
                    fail: () => {
                      Taro.showToast({
                        title: "已取消授权"
                      });
                    },
                    success: () => {
                      Taro.showToast({
                        title: "开启提醒成功"
                      });
                    }
                  });
                  setRemind(true);
                }

                // console.log("ok")
              }}>
              <IconFont name={"ring"} size={42}/>
              <View className="right-item-text">
                {!remind ? "开启提醒" : "关闭提醒"}
              </View>
            </View>
            <Button
              className="meet-info-right-item share"
              openType="share"
              onClick={() => {

                console.log("ok");
              }}>
              <View className="withe-line-top"/>
              <View className="withe-line-left"/>
              <IconFont name={"link"} size={42}/>
              <Text className="right-item-text">分享会议</Text>
              <View className="withe-line-bottom"/>
              <View className="withe-line-right"/>
            </Button>


          </View>
          <View className={`row-2 ${isCreator ? "" : "single"}`}>
            {isCreator ?
              <View
                className="meet-info-right-item"
                onClick={async () => {
                  setDeleteModalShow(true);
                }}
              >
                <IconFont name={"delete"} size={42}/>
                <View className="right-item-text">删除会议</View>
              </View>
              :
              <View
                className="meet-info-right-item"
                onClick={async () => {
                  setDeleteModalShow(true);
                }}
              >
                <IconFont name={"delete"} size={42}/>
                <View className="right-item-text">退出会议</View>
              </View>
            }
            <View
              className={`meet-info-right-item ${isCreator ? "" : "hide"}`}
              onClick={() => {
                let query = "";
                query += `meetid=${id}&`;
                query += `roomname=${meetingName}&`;
                query += `pdate=${date}&`;
                Taro.navigateTo({
                  url: `../MeetForm/index?${query}`
                })
                console.log("ok")
              }}>
              {isCreator &&
              <View>
                <IconFont name={"edit"} size={42}/>
                <View className="right-item-text">修改会议</View>
              </View>
              }

            </View>
          </View>
        </View>
        <InputModal
          title="输入原因"
          isRequired={true}
          isOpen={deleteModalShow}
          onMaskClick={() => {
            setDeleteModalShow(false);
          }}
          onCancelClick={() => {
            setDeleteModalShow(false);
          }}
          onConfirmClick={async (input) => {
            await Taro.showLoading();
            await deleteRev({
              id: id,
              remark: input
            });
            Taro.hideLoading();
          }}>
        </InputModal>
      </View>
    );


  }

export default MeetInfo;
