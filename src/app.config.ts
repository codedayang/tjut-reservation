import { useGlobalIconFont } from './component/iconfont/helper';

export default {
  pages: [
    'pages/MyMeet/index',
    'pages/MeetList/index',
    'pages/MeetForm/index',
    'pages/RoomDetail/index',
    'pages/UserAuth/index',
    'pages/MeetDetail/index',
    'pages/Setting/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
  tabBar: {
    "color": "#fdfdfd",
    "selectedColor": "#1aa4d0",
    list: [
      {
        "selectedIconPath": "images/MyMeetSelected.png",
        "iconPath": "images/MyMeet.png",
        "pagePath": "pages/MyMeet/index",
        "text": "日程安排"
      },
      {
        "selectedIconPath": "images/MeetListSelected.png",
        "iconPath": "images/MeetList.png",
        "pagePath": "pages/MeetList/index",
        "text": "会议预约"
      },
      // {
      //   "selectedIconPath": "images/SettingSelected.png",
      //   "iconPath": "images/Setting.png",
      //   "pagePath": "pages/Setting/index",
      //   "text": "设置"
      // },
    ]
  }
}
