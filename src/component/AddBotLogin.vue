<template>
  <!-- 显示登录窗口 -->
  <el-dialog
    :modelValue="OpenLoginWindow"
    @update:modelValue="(newValue:boolean) => (OpenLoginWindow = newValue)"
    title="添加自建机器人"
    width="90%"
  >
    <el-form
      style="width: 60%; text-align: center; margin: 0 auto; max-width: 400px"
    >
      <el-form-item>
        <el-input v-model="Bot_uin" prefix-icon="User" />
      </el-form-item>
      <el-form-item>
        <el-input show-password v-model="Bot_pwd" prefix-icon="Lock"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="margin: 0 auto; text-align: center">
        <el-button type="primary" @click="login" :disabled="!LoginBtn">登 录</el-button>
      </div>
    </template>
  </el-dialog>

    
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {ElMessage} from 'element-plus'
import {login} from '@/function/bot'
export default defineComponent({
  name: "AddNotLogin",
  props: {
    /**添加机器人成功的回调函数 */
    after: {
      type: Function,
      default: () => console.log("not found after function"),
    },
  },
  data() {
    return {
      OpenLoginWindow: ref(false),
      Bot_uin: "",
      Bot_pwd: "",
      LoginBtn: ref(true),

      OpenTicketWindow:ref(false),
      Ticket_btn:ref(true),

      ticket: '',
      TicketUrl: ''
    };
  },
  methods: {
    login() {
      if (this.Bot_pwd.length == 0 || this.Bot_uin.length == 0) {
        ElMessage({
            message: '请输入用户名和密码',
            type: 'error'
        })
        return
      }

      this.LoginBtn = false
      login(Number(this.Bot_uin), this.Bot_pwd).then(res => {
        this.LoginBtn = true
        switch(res.code) {
            case 200:
                ElMessage({
                    message: '添加成功,正在刷新页面',
                    type: 'success'
                })
                setTimeout(() => location.reload(), 1000)
                break;
            case 403:
                ElMessage({
                    message: '登录超时,请重新登录',
                    type:'error'
                })
                break
            case 701:
                this.TicketUrl = res.TicketUrl
                this.ticket = ''
                this.OpenTicketWindow = true
                break;
            
        }

      }).catch(err => {
        ElMessage({
            message: '登录遇到错误',
            type: 'error'
        })
        console.log(err)
        this.LoginBtn = true
      })
    },
    login_ticket() {
console.log(this.ticket)
    }
  },
});
</script>
