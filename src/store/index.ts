import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state() {
    return {
      token: '',
      user_data: {
        userlevel: '',
        /**用户权限持续时间至 */
        userlevel_ts: 0,
        /**用户余额 */
        usermoney: '',
        /**用户名 */
        username: '',
        /**用户唯一标识 */
        useruuid: '',
        /**用户注册时间 */
        reg_ts: 0,
        /**用户上次登录的ip */
        ip: '',
        /**绑定的qq */
        qid: 80000000
      },
      o_bot: [],
      m_bot: [],
    }
  },
  getters: {
    isLogin: async (state: any): Promise<boolean> => {
      return new Promise((res) => {
        if (state.token.length != 0) {
          axios.post('/api/getuserinfo', {}, {
            headers: {
              authorization: "Bearer " + state.token,
            },
          }).then(data => {
            if (data.data.code == 200) {
              res(true)
            } else res(false)
          }).catch(() => {
            res(false)
          })
        } else res(false)
      })
    },
    getuserinfo: (state: any) => {
      return state
    }
  },
  mutations: {
    logout(state: any) {
      state.token = ''
      state.user_data = {
        userlevel: '',
        /**用户权限持续时间至 */
        userlevel_ts: 0,
        /**用户余额 */
        usermoney: '',
        /**用户名 */
        username: '',
        /**用户唯一标识 */
        useruuid: '',
        /**用户注册时间 */
        reg_ts: 0,
        /**用户上次登录的ip */
        ip: '',
        /**绑定的qq */
        qid: 80000000
      }

    },
    saveinfo(state: any, data: any) {
      state.token = data.token
      state.user_data = {
        userlevel: data.user_data.userlevel,
        /**用户权限持续时间至 */
        userlevel_ts: data.user_data.userlevel_ts,
        /**用户余额 */
        usermoney: data.user_data.usermoney,
        /**用户名 */
        username: data.user_data.username,
        /**用户唯一标识 */
        useruuid: data.user_data.useruuid,
        /**用户注册时间 */
        reg_ts: data.user_data.reg_ts,
        /**用户上次登录的ip */
        ip: data.user_data.ip,
        /**绑定的qq */
        qid: data.user_data.qid
      }
    },
    /**
     * 
     * @param state store状态
     * @param data 机器人数组
     */
    saveBot(state: any, data: any) {
      state.o_bot = data
    },
    /**
     * 
     * @param state store状态
     * @param data 机器人数组
     */
    saveMyBot(state: any, data: any) {
      state.m_bot = data
    }
  }
})
