<template>
  <div id="login-main">
    <div style="max-width: 90%; text-align: center; margin: 0 auto">
      <div
        style="
          background-color: white;
          border-radius: 25px;
          position: absolute;
          top: 30%;
          min-width: 90%;
        "
      >
        <div
          style="border-style: solid; border-radius: 25px; border-color: white"
        >
          <div>
            <span style="position: relative; top: 10px">登录</span>
          </div>
          <div style="margin-top: 30px">
            <el-form
              style="
                width: 60%;
                text-align: center;
                margin: 0 auto;
                max-width: 400px;
              "
            >
              <el-form-item>
                <el-input v-model="username" prefix-icon="User"/>
              </el-form-item>
              <el-form-item>
                <el-input
                  show-password
                  v-model="password"
                  prefix-icon="Lock"
                  @keyup.enter="login"
                ></el-input>
              </el-form-item>
              <div style="margin-top: -20px; margin-left: -60%">
                <el-checkbox v-model="usecookie"
                  ><span style="color: bule; font-size: 10px"
                    >保持登录状态</span
                  ></el-checkbox
                >
              </div>
              <el-form-item>
                <div style="text-align: center; margin: 0 auto">
                  <el-button type="primary" @click="login" :disabled="!loginbtn"
                    >登 录</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";
import md5 from "js-md5";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      usecookie: true,
      loginbtn: true,
    };
  },
  created() {
    if (this.$cookies.isKey("token")) {
      this.axios
        .post(
          "/api/getuserinfo",
          {},
          {
            headers: {
              authorization: "Bearer " + this.$cookies.get("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 200) {
            store.commit("saveinfo", {
              token: this.$cookies.get("token"),
              user_data: {
                userlevel: res.data.user_data.userlevel,
                /**用户权限持续时间至 */
                userlevel_ts: res.data.user_data.userlevel_ts,
                /**用户余额 */
                usermoney: res.data.user_data.usermoney,
                /**用户名 */
                username: res.data.user_data.username,
                /**用户唯一标识 */
                useruuid: res.data.user_data.useruuid,
                /**用户注册时间 */
                reg_ts: res.data.user_data.reg_ts,
                /**用户上次登录的ip */
                ip: res.data.user_data.ip,
                /**绑定的qq */
                qid: res.data.user_data.qid,
              },
            });
            ElMessage({
              message: "自动登录成功",
              type: "success",
            });
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 1000);
          } else {
            ElMessage({
              message: "登录过期",
              type: "error",
            });
            this.$cookies.remove("token");
            return;
          }
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {
    loop() {
      setTimeout(() => {
        this.loop();
      }, 990);
    },
    aa() {
      console.log(this.usecookie);
    },
    login() {
      this.loginbtn = false;
      if (this.username.length == 0) {
        ElMessage({
          message: "请输入用户名",
          type: "error",
        });
        this.loginbtn = true;
        return;
      }

      if (this.password.length == 0) {
        ElMessage({
          message: "请输入密码",
          type: "error",
        });
        this.loginbtn = true;
        return;
      }
      const pwd = md5(this.password);
      this.axios
        .post("/api/login", {
          username: this.username,
          password: pwd,
        })
        .then((res) => {
          switch (res.data.code) {
            case 602:
              ElMessage({
                message: "用户不存在",
                type: "error",
              });
              this.loginbtn = true;
              break;
            case 603:
              ElMessage({
                message: "密码错误",
                type: "error",
              });
              this.loginbtn = true;
              break;
            case 200:
              ElMessage({
                message: "欢迎您, " + this.username,
                type: "success",
              });
              try {
                if (this.usecookie) {
                  this.$cookies.set("token", res.data.token);
                }
                console.log(res.data);
                store.commit("saveinfo", {
                  token: res.data.token,
                  user_data: {
                    userlevel: res.data.user_data.userlevel,
                    /**用户权限持续时间至 */
                    userlevel_ts: res.data.user_data.userlevel_ts,
                    /**用户余额 */
                    usermoney: res.data.user_data.usermoney,
                    /**用户名 */
                    username: this.username,
                    /**用户唯一标识 */
                    useruuid: res.data.user_data.useruuid,
                    /**用户注册时间 */
                    reg_ts: res.data.user_data.reg_ts,
                    /**用户上次登录的ip */
                    ip: res.data.user_data.ip,
                    /**绑定的qq */
                    qid: res.data.user_data.qid,
                  },
                });

                setTimeout(() => {
                  this.$router.push({ name: "home" });
                  this.loginbtn = true;
                }, 1000);
              } catch (e) {
                ElMessage({
                  message: "未知错误",
                  type: "error",
                });
                this.loginbtn = true;
                console.log(e);
                return;
              }
              break;

            case 604:
              ElMessage({
                message: "你被禁止登录至" + res.data.end_time,
                type: "error",
              });
              this.loginbtn = true;
              break;
            default:
              ElMessage({
                message: "未知错误",
                type: "error",
              });
              this.loginbtn = true;
              console.log(res.data);
              return;
          }
        })
        .catch((err) => {
          ElMessage({
            message: "未知错误",
            type: "error",
          });
          this.loginbtn = true;
          console.log(err);
          return;
        });
    },
  },
});
</script>
<style>
#login-main {
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
</style>
