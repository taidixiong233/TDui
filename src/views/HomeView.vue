<template>
  <div id="body-main">
    <el-container>
      <el-header>
        <!-- 显示在主页上方的部分 -->
        <HeadTopview :open_user_drawer="open_user_drawer"/>
        <!-- 用户中心弹窗 -->
        <UserCenter :logout="logout" v-model="ShowUserDrawer" />
      </el-header>
      <el-main>
        <!-- 信息牌 -->
        <OSInfoShowVue
          :IsLogouting="IsLogouting"
          style="background-color: white; border-radius: 25px"
        />

        <!-- 仪表牌 -->
        <OSStateDashboard :IsLogouting="IsLogouting" />

        <!-- 机器人列表 -->
        <BotShow/>

        <!-- 添加机器人 -->
        <AddBot/>

        <el-dialog
          v-model="ShowAddBotCaptchaWindow"
          title="滑动验证码"
          width="85%"
        >
          <el-form
            style="
              width: 60%;
              text-align: center;
              margin: 0 auto;
              max-width: 350px;
            "
            ><span
              >请使用浏览器打开{{
                AddBotCaptchaUrl
              }}并从网络响应中取出ticket输入</span
            >
            <el-form-item>
              <el-input v-model="mybot_ticket" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div style="margin: 0 auto; text-align: center">
              <el-button type="primary"
                >确定</el-button
              >
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { ElMessage, ElMessageBox } from "element-plus";
import { QuestionFilled, WarningFilled, Plus } from "@element-plus/icons-vue";
import UserCenter from "@/component/UserCenter.vue";
import OSInfoShowVue from "@/component/OSInfoShow.vue";
import OSStateDashboard from "@/component/OSStateDashboard.vue";
import HeadTopview from '@/component/HeadTopview.vue'
import BotShow from '@/component/BotShow.vue'
import AddBot from '@/component/AddBot.vue'

export default defineComponent({
  name: "HomeView",
  data() {
    return {


      /**添加机器人的选择菜单 */
      ShowAddBotChoice: ref(false),
      ShowAddBotLogin: ref(false),

      /**自建机器人的账号和密码 */
      mybot_uin: "",
      mybot_pwd: "",
      mybot_ticket: "",

      /**滑块窗口 */
      AddBotCaptchaUrl: "",
      ShowAddBotCaptchaWindow: ref(false),

      /**使用的icon */
      QuestionFilled: QuestionFilled,
      WarningFilled: WarningFilled,
      Plus: Plus,

      store: store,
      /**是否显示用户中心侧页 */
      ShowUserDrawer: ref(false),
      ShowUserDrawer_width: ref("80%"),

      /**是否正在登出 */
      IsLogouting: ref(false),
    };
  },
  methods: {
    open_user_drawer() {
      this.ShowUserDrawer_width = window.innerWidth * 0.75 + "px";
      this.ShowUserDrawer = true;
    },
    logout() {
      this.IsLogouting = true;

      let error = -1;
      for (; this.$cookies.isKey("token"); ) {
        if (error > 10) {
          /**QQ内置浏览器无法实时删除cookies，删除后刷新即可 */
          ElMessage({
            message: "已经退出登录",
            type: "success",
          });
          setTimeout(() => {
            location.reload();
          }, 1000);
          return;
        } else {
          error++;
          this.$cookies.remove("token");
        }
      }
      for (; store.state.token.length != 0; ) {
        store.commit("logout");
      }
      ElMessage({
        message: "已经退出登录",
        type: "success",
      });
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 1000);
    },
  },
  components: {
    UserCenter,
    OSInfoShowVue,
    OSStateDashboard,
    HeadTopview,
    BotShow,
    AddBot
  },
});
</script>

<style>
#botinfo_text_top {
  display: flex;
  min-height: 42px;
  color: darkgrey;
  margin-top: 18px;
  font-size: 14px;
  margin-left: 5px;
}
#body-main {
  background-color: #f0f2f5;
  height: 100%;
  width: 100%;
  position: relative;
  left: -8px;
  top: -8px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  min-width: 250px;
  min-height: 100vh;
}

#header-left-img {
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin-top: 5px;
  margin-left: 5px;
}
#user_center_drawer_img {
  height: 60px;
  width: 60px;
  border-radius: 100%;
}
#user_center_drawer_text {
  margin-top: 10px;
}
#user_center_button_group {
  margin-top: 40px;
}
</style>
