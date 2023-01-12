<template>
  <div style="border-style: solid; border-radius: 25px; border-color: white">
    <span style="font-size: 12px"
      >系统信息:
      <el-tag
        >{{ DeviceInfo.system.type }} {{ DeviceInfo.system.version }}</el-tag
      >
      <el-tag style="margin-left: 5px">{{ DeviceInfo.system.arch }}</el-tag>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {ElMessage} from 'element-plus'
import store from "@/store";

export default defineComponent({
  name: "OSInfoShow",
  props: {
    IsLogouting: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      /**设备信息 */
      DeviceInfo: {
        cpu: {
          model: "",
          number: 0,
          speed: 0,
        },
        system: {
          type: "",
          version: "",
          arch: "",
        },
        mem: {
          free: 0,
          total: 1,
        },
      },
    };
  },
  created() {
    this.axios
      .post(
        "/api/getdeviceinfo",
        {},
        {
          headers: {
            authorization: "Bearer " + store.state.token,
          },
        }
      )
      .then((res) => {
        switch (res.data.code) {
          case 403:
            if (!this.IsLogouting) {
              ElMessage({
                message: "登录过期,请重新登录",
                type: "error",
              });
              store.commit("logout");
              if (this.$cookies.isKey("token")) this.$cookies.remove("token");
              setTimeout(() => {
                this.$router.push({ name: "login" });
              }, 1000);
            }
            break;
          case 200:
            this.DeviceInfo = res.data.data;
            break;
          default:
            ElMessage({
              message: "未知错误",
              type: "error",
            });
        }
      });
  }
});
</script>
