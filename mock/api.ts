export default {
  'POST /login': {
    // "code" : "A0220",
    "code" : "00000",
    "message" : "请求成功",
    "data" : {
      "needAuth" : false,
      "token" : "1236782"
    }
  },
  'POST /loginAuth': {
    // "code" : "A0220",
    "code" : "00000",
    "message" : "请求成功",
    "data" : {
      "token" : "1236782"
    }
  },
  'POST /getMyReservations': {
    "code" : "00000",
    // "code" : "A0220",
    "message" : "success",
    "data" : {
      "months" : [
        0,1,2,1,0,0,0,0,0,0,0,0
      ],
      "info" : [
        {
          "id" : "1",
          "name" : "党课",
          "creator" : "徐浩瀚",
          "meetingName" : "206",
          "date" : "今天",
          "time" : "12:00-13:00",
          "status": "未开始"
        }
      ]
    }
  },
  'POST /getReservation': {
    "code" : "00000",
    "message" : "success",
    "data" : {
      "isCreator" : "true",
      "id" : "1",
      "name" : "党课",
      "creator" : "徐浩瀚",
      "meetingName" : "206",
      "date" : "今天",
      "time" : "12:00-13:00",
      "content" : "Strstrstr",
      "participant" : [
        {
          "id" : "12112121212121212121",
          "name" : "徐浩瀚",
          "nickName" : "无名氏",
          "avatarUrl" : "https://thirdwx.qlogo.cn/mmopen/vi_32/Ct8bt215tupXCQI35yOHicB9t5goblvunk3ianx5nJCqeJOKEEkFq6QA39kPiacJP5UjV11zjUm7xRk67G67Ix8qQ/132"
        }
      ]
    }
  },
  "POST /getReservations": {
    "code" : "00000",
    "message" : "success",
    "data" : {
      "meetingRoom" : [
        {
          "roomid" : "1",
          "name" : "206",
          "date" : "每天",
          "time" : "08:00-23:00",
          "remark" : "remarkremark"
        }
      ],
      "day" : [
        {
          "dayOfMonth": "10",
          "count" : 1,
          "meetingRoomInfo" : [
            {
              "roomid" : 1,
              "count" : 1,
              "bar" : [
                // {
                //   "start" : 0,
                //   "end" : 0.0333
                // },
                {
                  "start" : 0.0333,
                  "end" : 0.2444
                },
              ],
              "meetingInfo" : [
                {
                  "id" : 1,
                  "name" : "党课",
                  "creator" : "徐浩瀚",
                  "date" : "今天",
                  "time" : "08:30-11:40"
                }
              ]
            }
          ]
        },{
          "dayOfMonth": "2",
          "count" : 1,
          "meetingRoomInfo" : [
            {
              "roomid" : 1,
              "count" : 1,
              "bar" : [
                {
                  "start" : 0.0333,
                  "end" : 0.2444
                }
              ],
              "meetingInfo" : [
                {
                  "id" : 1,
                  "name" : "党课",
                  "creator" : "徐浩瀚",
                  "date" : "今天",
                  "time" : "08:30-11:40"
                }
              ]
            }
          ]
        },{
          "dayOfMonth": "1",
          "count" : 1,
          "meetingRoomInfo" : [
            {
              "roomid" : 1,
              "count" : 1,
              "bar" : [
                {
                  "start" : 0.0333,
                  "end" : 0.2444
                }
              ],
              "meetingInfo" : [
                {
                  "id" : 1,
                  "name" : "党课",
                  "creator" : "徐浩瀚",
                  "date" : "今天",
                  "time" : "08:30-11:40"
                }
              ]
            }
          ]
        }
      ]
    }
  }

}
