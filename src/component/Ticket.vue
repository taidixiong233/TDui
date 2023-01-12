<template>
<!-- 显示滑块窗口 !-->
<el-dialog
v-model="OpenTicketWindow"
    title="滑块"
    width="85%"
  >
  <span>请打开{{ TicketUrl }}完成滑动验证码并从网络响应中取出ticket填入下方</span>
    <el-form
      style="width: 60%; text-align: center; margin: 0 auto; max-width: 380px"
    >
      <el-form-item>
        <el-input v-model="ticket" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="margin: 0 auto; text-align: center">
        <el-button type="primary" @click="login_ticket" :disabled="!Ticket_btn">继 续 登 录</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'ticket',
    props: {
        TicketUrl: {
            type: String,
            default: '未获得链接'
        },


        

    },
    data() {
        return { 
            Ticket_btn : true,
            ticket: ''
        }
    }
})
</script>