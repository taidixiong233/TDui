<template>
  <!-- 添加机器人 -->
  <div
    style="
      background-color: white;
      border-radius: 25px;
      margin-top: 10px;
      height: 50px;
    "
    @click="OpenChoiceWindow"
  >
    <el-icon style="margin-top: 15px"><Plus /></el-icon>
  </div>

  <!-- 新增机器人菜单 -->
  <!-- 显示选择菜单 -->

  <el-drawer
    :with-header="false"
    v-model="ShowAddBotChoice"
    direction="btt"
    size="210"
  >
    <el-menu>
      <el-menu-item index="1" @click="AddBot">
        <span style="margin: 0 auto; text-align: center"
          >使用官方机器人(安全稳定)</span
        >
      </el-menu-item>
      <el-menu-item index="2" @click="AddMyBot">
        <span style="margin: 0 auto; text-align: center">使用自建机器人</span>
      </el-menu-item>
      <el-menu-item index="3" @click="CloseChoiceWindow">
        <span style="margin: 0 auto; text-align: center">取消</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>

  <!-- 登录页面 -->
  <AddBotLogin v-model="ShowAddBotLogin" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import AddBotLogin from "./AddBotLogin.vue";
export default defineComponent({
  name: "AddBot",
  data() {
    return {
      ShowAddBotChoice: ref(false),
      ShowAddBotLogin: ref(false),
    };
  },
  methods: {
    OpenChoiceWindow() {
      this.ShowAddBotChoice = true;
    },
    AddMyBot() {
      this.ShowAddBotLogin = true;
      this.ShowAddBotChoice = false;
    },
    AddBot() {
      console.log(2);
      this.ShowAddBotChoice = false;
    },
    CloseChoiceWindow() {
      this.ShowAddBotChoice = false;
    },
  },
  components: {
    AddBotLogin,
  },
});
</script>
<style></style>
