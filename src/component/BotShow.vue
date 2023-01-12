<template>
  <div id="BotShow" :style="style">
    <!-- 机器人信息展示框 -->

    <!-- 官方机器人 -->
    <!-- 在线的机器人 -->
    <div v-for="item in onlineBot_obot" :key="(item as any).bot_uin">
      <div
        style="background-color: white; border-radius: 25px; margin-top: 10px"
        @click="openBotInfo(Number((item as any).bot_uin))"
      >
        <div
          style="border-style: solid; border-radius: 25px; border-color: white"
        >
          <div
            style="
              display: inline;
              width: 50px;
              float: left;
              margin: 5px;
              width: 60px;
            "
          >
            <img
              :src="`https://q1.qlogo.cn/g?b=qq&s=0&nk=${(item as any).bot_uin}`"
              fit="none"
              alt=""
              style="height: 50px; width: 50px; border-radius: 100%"
            />
          </div>
          <el-container direction="horizontal">
            <span id="botinfo_text_top" style="width: 60%"
              >账号{{ (item as any).bot_uin }}</span
            >
            <span>
              <span id="botinfo_text_top">在线</span>
            </span>
            <img
              :src="require('@/assets/login_success.png')"
              fit="none"
              alt=""
              style="
                height: 30px;
                width: 30px;
                margin-top: 10px;
                display: inline;
              "
            />
          </el-container>
        </div>
      </div>
    </div>

    <!-- 离线的机器人 -->
    <div v-for="item in offlineBot_obot" :key="(item as any).bot_uin">
      <el-tooltip effect="dark" placement="bottom"
        ><template #content
          >机器人{{
            (item as any).bot_uin
          }}已经离线<br />如果你还需要使用这个机器人<br />请联系机器人供应商</template
        >
        <div
          style="background-color: white; border-radius: 25px; margin-top: 10px"
        >
          <div
            style="
              border-style: solid;
              border-radius: 25px;
              border-color: white;
            "
          >
            <div
              style="
                display: inline;
                width: 50px;
                float: left;
                margin: 5px;
                width: 60px;
              "
            >
              <img
                :src="`https://q1.qlogo.cn/g?b=qq&s=0&nk=${(item as any).bot_uin}`"
                fit="none"
                alt=""
                style="height: 50px; width: 50px; border-radius: 100%"
              />
            </div>
            <el-container direction="horizontal">
              <span id="botinfo_text_top" style="width: 60%"
                >账号{{ (item as any).bot_uin }}</span
              >
              <span>
                <span id="botinfo_text_top">离线</span>
              </span>

              <el-icon color="red" style="margin-top: 20px; margin-left: 5px"
                ><WarningFilled
              /></el-icon>
            </el-container>
          </div>
        </div>
      </el-tooltip>
    </div>

    <!-- 自建机器人 -->
    <!-- 在线的机器人 -->
    <div v-for="item in onlineBot_mbot" :key="(item as any).bot_uin">
      <div
        style="background-color: white; border-radius: 25px; margin-top: 10px"
        @click="openBotInfo(Number((item as any).bot_uin))"
      >
        <div
          style="border-style: solid; border-radius: 25px; border-color: white"
        >
          <div
            style="
              display: inline;
              width: 50px;
              float: left;
              margin: 5px;
              width: 60px;
            "
          >
            <img
              :src="`https://q1.qlogo.cn/g?b=qq&s=0&nk=${(item as any).bot_uin}`"
              fit="none"
              alt=""
              style="height: 50px; width: 50px; border-radius: 100%"
            />
          </div>
          <el-container direction="horizontal">
            <span id="botinfo_text_top" style="width: 60%"
              >账号{{ (item as any).bot_uin }}</span
            >
            <span>
              <span id="botinfo_text_top">在线</span>
            </span>
            <img
              :src="require('@/assets/login_success.png')"
              fit="none"
              alt=""
              style="
                height: 30px;
                width: 30px;
                margin-top: 10px;
                display: inline;
              "
            />
          </el-container>
        </div>
      </div>
    </div>

    <!-- 离线的机器人 -->
    <div v-for="item in offlineBot_mbot" :key="(item as any).bot_uin">
      <el-tooltip effect="dark" placement="bottom"
        ><template #content
          >机器人{{
            (item as any).bot_uin
          }}已经离线<br />如果你还需要使用这个机器人<br />请联系机器人供应商</template
        >
        <div
          style="background-color: white; border-radius: 25px; margin-top: 10px"
        >
          <div
            style="
              border-style: solid;
              border-radius: 25px;
              border-color: white;
            "
          >
            <div
              style="
                display: inline;
                width: 50px;
                float: left;
                margin: 5px;
                width: 60px;
              "
            >
              <img
                :src="`https://q1.qlogo.cn/g?b=qq&s=0&nk=${(item as any).bot_uin}`"
                fit="none"
                alt=""
                style="height: 50px; width: 50px; border-radius: 100%"
              />
            </div>
            <el-container direction="horizontal">
              <span id="botinfo_text_top" style="width: 60%"
                >账号{{ (item as any).bot_uin }}</span
              >
              <span>
                <span id="botinfo_text_top">离线</span>
              </span>

              <el-icon color="red" style="margin-top: 20px; margin-left: 5px"
                ><WarningFilled
              /></el-icon>
            </el-container>
          </div>
        </div>
      </el-tooltip>
    </div>
  </div>

  <!-- 显示机器人详情的弹出窗口 -->
  <div id="ShowBotWindow">
    <el-dialog v-model="ShowBotWindow" :width="ShowBotWindow_width">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass" style="display: inline">
            机器人详情
          </h4>
        </div>
      </template>
      <span
        >启动时间:
        {{
          ts2string(Number((ShowBotWindow_text as any).start_time) * 1000)
        }}</span
      >
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content>
          这是机器人的启动时间<br />即机器人程序开始运行的时间
        </template>
        <el-icon><QuestionFilled /></el-icon
      ></el-tooltip>
      <br />
      <span
        >机器人掉线次数: {{ (ShowBotWindow_text as any).lost_times }}次</span
      >
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人QQ登录掉线次数<br />越少越好 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>收到的包数: {{ (ShowBotWindow_text as any).recv_pkt_cnt }}个</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人发出数据包的数量 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>发送的包数: {{ (ShowBotWindow_text as any).sent_pkt_cnt }}个</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人收到数据包的数量 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>丢失的包数: {{ (ShowBotWindow_text as any).lost_pkt_cnt }}个</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人丢失的数据包数量<br />越少越好 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>发消息条数: {{ (ShowBotWindow_text as any).sent_msg_cnt }}条</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人发消息的条数<br />若为0则是未统计 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>收消息条数: {{ (ShowBotWindow_text as any).recv_msg_cnt }}条</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人收到消息的条数 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>消息服务器地址: {{ (ShowBotWindow_text as any).remote_ip }}</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人连接的服务器ip地址 </template>
        <el-icon><QuestionFilled /></el-icon></el-tooltip
      ><br />
      <span>消息服务器端口: {{ (ShowBotWindow_text as any).remote_port }}</span>
      <el-tooltip effect="dark" placement="bottom-end"
        ><template #content> 机器人连接的服务器端口 </template>
        <el-icon><QuestionFilled /></el-icon
      ></el-tooltip>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import * as type from "@/types";
import store from "@/store";
import { getBotInfo, getBotStat, getBotStatus } from "@/function/bot";
import { ElMessage, ElLoading } from "element-plus";

export default defineComponent({
  name: "BotShow",
  mounted() {
    this.InitBotInfo();
  },
  methods: {
    /**
     * 解析机器人对象，异步函数
     * @param data getBotInfo返回的机器人对象数组
     */
    async InitBotInfo(): Promise<void> {
      const load = ElLoading.service({
        target: document.querySelector("#BotShow") as HTMLElement,
        text: "正在努力的获取机器人信息...",
        fullscreen: false,
      });
      getBotInfo()
        .then((data) => {
          if (!data.mbot || !data.obot) {
            ElMessage({
              message: "机器人信息解析失败",
              type: "error",
            });
            load.close();
            this.style = "";
            console.log(data);
            return;
          }
          for (let bot of data.mbot) {
            getBotStat(bot.bot_uin)
              .then((data) => {
                switch (data.code) {
                  case 403:
                    this.TokenError();
                    load.close();
                    return;
                  case 200:
                    if (data.data == "未登录") {
                      (this.offlineBot_mbot as any[]).push(bot);
                    } else {
                      (this.onlineBot_mbot as any[]).push(bot);
                    }
                    break;
                  default:
                    ElMessage({
                      message: "未知错误",
                      type: "error",
                    });
                    console.log(data);
                    return;
                }
              })
              .catch((err) => {
                ElMessage({
                  message: "机器人状态获取失败",
                  type: "error",
                });
                load.close();
                this.style = "";
                console.log(err);
              });
          }

          for (let bot of data.obot) {
            getBotStat(bot.bot_uin)
              .then((data) => {
                switch (data.code) {
                  case 403:
                    this.TokenError();
                    load.close();
                    this.style = "";
                    return;
                  case 200:
                    if (data.data == "未登录") {
                      (this.offlineBot_obot as any[]).push(bot);
                    } else {
                      (this.onlineBot_obot as any[]).push(bot);
                    }
                    break;
                  default:
                    ElMessage({
                      message: "未知错误",
                      type: "error",
                    });
                    load.close();
                    this.style = "";
                    console.log(data);
                    return;
                }
              })
              .catch((err) => {
                ElMessage({
                  message: "机器人状态获取失败",
                  type: "error",
                });
                console.log(err);
              });
          }
          load.close();
          this.style = "";
        })
        .catch((err) => {
          ElMessage({
            message: "机器人状态获取失败",
            type: "error",
          });
          load.close();
          this.style = "";
          console.log(err);
        });
    },
    TokenError() {
      ElMessage({
        message: "登录过期, 请重新登录",
        type: "error",
      });
    },
    ts2string(ts: number): string {
      let time = new Date(ts);
      return `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
    openBotInfo(uin: number) {
      if (window.innerWidth < 250) {
        ElMessage({
          message: "你的屏幕分辨率过低,无法显示",
          type: "error",
        });
        return;
      } else if (window.innerWidth > 500) {
        this.ShowBotWindow_width = "300px";
      } else {
        this.ShowBotWindow_width = window.innerWidth * 0.7 + "px";
      }
      const load = ElLoading.service({
        text: "正在努力的获取机器人信息...",
        fullscreen: false,
      });

      getBotStatus(uin)
        .then((res) => {
          load.close() 
          switch (res.code) {
            case 200:
              this.ShowBotWindow = true;
              this.ShowBotWindow_text = res.data;
              break;
            case 403:
              this.ShowBotWindow = false;
              this.TokenError();
              return;
            default:
              this.ShowBotWindow = false;
              ElMessage({
                message: "获取机器人数据失败",
                type: "error",
              });
              console.log(res);
              return;
          }
        })
        .catch((err) => {
          this.ShowBotWindow = false;
          ElMessage({
            message: "获取机器人数据失败",
            type: "error",
          });
          console.log(err);
          return;
        });
    },
  },
  data() {
    return {
      ShowBotWindow: ref(false),
      onlineBot_mbot: [],
      onlineBot_obot: [],
      offlineBot_mbot: [],
      offlineBot_obot: [],
      style: "position: relative;height: 100px",
      ShowBotWindow_width: "50%",
      ShowBotWindow_text: "",
    };
  },
});
</script>
