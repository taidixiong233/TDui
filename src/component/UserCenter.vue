<template>
  <el-drawer
    :modelValue="ShowUserDrawer"
    @update:modelValue="(newValue:boolean) => (ShowUserDrawer = newValue)"
    title="用户中心"
    direction="ltr"
    :size="ShowUserDrawer_width"
  >
    <div style="margin: 0 auto; text-align: center">
      <img
        :src="`https://q1.qlogo.cn/g?b=qq&s=0&nk=${store.state.user_data.qid}`"
        fit="none"
        alt=""
        id="user_center_drawer_img"
      />
    </div>
    <div id="user_center_drawer_text">
      {{ store.state.user_data.username }}
    </div>
    <div id="user_center_button_group">
      <el-button type="primary" round @click="logout">退出登录</el-button>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
export default defineComponent({
  name: "UserCenter",
  props: {
    /**登出函数 */
    logout: {
      type: Function,
      default: () => console.log("not found logout function"),
    },
  },
  data() {
    return {
      /**窗口的宽度 */
      ShowUserDrawer_width: window.innerWidth * 0.75 + "px",
      /**vuex */
      store: store,
      /**是否打开窗口 */
      ShowUserDrawer: ref(false)
    };
  },
});
</script>
