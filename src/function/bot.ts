import axios from 'axios'
import store from '@/store'
import * as type from '@/types'

/**
 * 获取用户的机器人信息
 * @param token 用户的token,不填写则从vuex中获取
 * @returns 若成功，返回机器人对象的数组
 */
export async function getBotInfo(token: string = store.state.token): Promise<any> {
    const mbot: type.Base_MyBot[] = []
    const obot: type.OfficialBot[] = []

    try {
        let data = await axios.post('/api/querymybot', {}, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        switch (data.data.code) {
            case 200:
                mbot.push(...data.data.data)
                break;
            default:
                return new Promise((res, rej) => res({ ...data.data }))
        }
        data = await axios.post('/api/querybot', {}, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        switch (data.data.code) {
            case 200:
                obot.push(...data.data.data)
                break;
            default:
                return new Promise((res, rej) => res({ ...data.data }))
        }
        return new Promise((res) => res({
            obot: obot,
            mbot: mbot
        }))
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}

/**
 * 获取机器人的在线状态
 * @param bot_uin 机器人的uin
 * @param token 用户的token,不填写则从vuex中获取
 */
export async function getBotStat(bot_uin: number, token: string = store.state.token): Promise<{ code: number, data: string }> {
    try {
        const bot = await axios.post('/api/getBotStatus', {
            bot_uin: bot_uin
        }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })

        return new Promise((res) => res({ ...bot.data }))

    } catch (err) {
        return new Promise((res, rej) => {
            rej(err)
        })
    }
}

/**
 * 获取机器人的统计数据
 * @param bot_uin 机器人的uin
 * @param token 用户的token,不填写则从vuex中获取
 */
export async function getBotStatus(bot_uin: number, token: string = store.state.token): Promise<any> {
    try {
        const bot = await axios.post(
            "/api/getbotstate",
            {
                bot_uin: bot_uin,
            },
            {
                headers: {
                    authorization: "Bearer " + token,
                },
            })
        return new Promise(res => res({ ...bot.data }))
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }

}

export async function login(uin: number, pwd: string, token: string = store.state.token, ticket?: string, smscode?: string): Promise<any> {
    /**先尝试添加机器人 */
    try {
        const addBot_res = await add_bot(uin, pwd)
        switch (addBot_res.code) {
            case 200:
            case 606: {
                if (ticket) {
                    const SendTicket = await send_ticket(uin, ticket)
                    return new Promise(res => res({ ...SendTicket }))
                }
                if (smscode) {
                    const SMSCode = await send_ticket(uin, smscode)
                    return new Promise(res => res({ ...SMSCode }))
                }
                const LoginBot = await login_use_pwd(uin, pwd)
                return new Promise(res => res({ ...LoginBot }))
            }

            default:
                return new Promise(res => res({ ...addBot_res }))
        }
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}

/**
 * 添加一个机器人
 * @param uin 机器人的账号
 * @param pwd 机器人的密码
 * @param token 用户的token,不填写则从vuex中获取
 * @returns 接口返回的数据
 */
async function add_bot(uin: number, pwd: string, token: string = store.state.token): Promise<any> {
    try {
        const row = await axios.post('/api/addmybot', {
            bot_uin: uin,
            bot_pwd: pwd
        }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })

        return new Promise(res => res({ ...row.data }))
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}

/**
 * 登录机器人
 * @param uin 机器人的账号
 * @param pwd 机器人的密码
 * @param token 用户的token,不填写则从vuex中获取
 * @returns 接口返回的数据
 */
async function login_use_pwd(uin: number, pwd: string, token: string = store.state.token): Promise<any> {
    try {
        const row = await axios.post('/api/loginbot', {
            bot_uin: uin,
            bot_pwd: pwd
        }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })

        return new Promise(res => res({ ...row.data }))
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}

/**
 * 提交ticket
 * @param uin 机器人的账号
 * @param ticket 验证码的返回
 * @param token 用户的token,不填写则从vuex中获取
 * @returns 接口返回的数据
 */
async function send_ticket(uin: number, ticket: string, token: string = store.state.token): Promise<any> {
    try {
        const row = await axios.post('/api/ticket', {
            bot_uin: uin,
            ticket: ticket
        }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })

        return new Promise(res => res({ ...row.data }))
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}

/**
 * 提交短信验证码
 * @param uin 机器人的账号
 * @param code 短信验证码
 * @param token 用户的token,不填写则从vuex中获取
 * @returns 接口返回的数据
 */
async function send_smscode(uin: number, code: string, token: string = store.state.token): Promise<any> {
    try {
        const row = await axios.post('/api/smscode', {
            bot_uin: uin,
            code: code
        }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })

        return new Promise(res => res({ ...row.data }))
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}