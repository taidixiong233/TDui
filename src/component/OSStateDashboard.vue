<template>
  <div style="background-color: white; border-radius: 25px; margin-top: 10px">
    <span style="display: inline-block; margin: 10px">
      <el-progress
        type="dashboard"
        :percentage="Number(String((DeviceInfo_e as any).cpu_load).slice(0, String((DeviceInfo_e as any).cpu_load).length-1))"
        ><template #default="{ percentage }">
          <span style="display: block">{{ percentage }}%</span>
          <span style="display: block; font-size: 12px; margin-top: 8px"
            >CPU使用率</span
          >
        </template></el-progress
      >
    </span>

    <span style="display: inline-block; margin: 10px">
      <el-progress
        type="dashboard"
        :percentage="
          Number(
            String(
              ((DeviceInfo.mem.total - DeviceInfo_e.free_mem) /
                DeviceInfo.mem.total) *
                100
            ).slice(0, 4)
          )
        "
        ><template #default="{ percentage }">
          <span style="display: block">{{ percentage }}%</span>
          <span style="display: block; font-size: 12px; margin-top: 8px"
            >内存使用率</span
          >
        </template></el-progress
      >
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import store from "@/store";

export default defineComponent({
  name: "OSStateDashboard",
  props: {
    IsLogouting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**设备实时信息 */
      DeviceInfo_e: ref({
        cpu_speed: [],
        cpu_load: "0%",
        free_mem: 0,
      }),
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
    this.loop();
  },
  methods: {
    loop() {
      setTimeout(() => {
        this.axios
          .post(
            "/api/getdeviceinfo_e",
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
                  if (this.$cookies.isKey("token"))
                    this.$cookies.remove("token");
                  setTimeout(() => {
                    this.$router.push({ name: "login" });
                  }, 1000);
                }
                break;
              case 200:
                this.DeviceInfo_e = res.data.data;
                break;
              default:
                ElMessage({
                  message: "未知错误",
                  type: "error",
                });
            }
          });
        if (this.$route.name == "home" && !this.IsLogouting) this.loop();
      }, 3500);
    },
  },
});
</script>
