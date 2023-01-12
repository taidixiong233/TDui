<template>
        <div id="header-body">
          <img
            :src="`https://q1.qlogo.cn/g?b=qq&s=0&nk=${store.state.user_data.qid}`"
            fit="none"
            alt=""
            id="header-left-img"
            @click="open_user_drawer()"
          />
        </div>
        <!-- 文字 -->
        <div style="margin-top: 23px; float: left; font-size: 15px">
          {{ store.state.user_data.username }}
        </div>
        <!-- 工具按钮 -->
        <div style="float: right; margin-top: 20px">
          <el-button text circle
            ><el-icon size="20"><Operation /></el-icon
          ></el-button>
        </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {ElMessage} from 'element-plus'
import store from "@/store";

export default defineComponent({
    name: 'HeadTopview',
    props:{
        open_user_drawer: {
            type: Function,
            default: () => console.log('not found function')
        }
    },
    data() {
        return {
            store:store
        }
    }
})
</script>

<style>
#header-body {
  display: inline;
  width: 50px;
  float: left;
  margin-top: 8px;
  width: 60px;
  margin-left: -18px;
}
</style>