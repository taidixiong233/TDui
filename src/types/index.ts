/**token里包含的数据(公开数据) */
export interface Token_data {
    /**用户名 */
    username: string,
    /**用户唯一标识 */
    useruuid: string,
    /**用户注册时间 */
    reg_ts: number,
    /**用户上次登录的ip */
    ip: string,
    /**绑定的qq */
    qid: number
}

/**前端所需的数据 */
export interface Export_User_data extends Token_data {
    /**
     * 用户权限
     * 
     * 普通用户
     * 代理用户
     * 站长
     * 被禁用
     * 不存在
     */
    userlevel: string,
    /**用户权限持续时间至 */
    userlevel_ts: number,
    /**用户余额 */
    usermoney: string,
}

/**一个用户 */
export interface User extends Export_User_data {
    /**用户密码 */
    password: string,
    /**用户使用的官方机器人 */
    o_bot: OfficialBot[],
    /**用户自己添加的机器人 */
    m_bot: MyBot[]
}

/**一个官方机器人 */
export interface OfficialBot {
    /** 机器人QQ */
    bot_uin: number,
    /**机器人添加时间 */
    start_ts: number,
    /**机器人过期时间 */
    end_ts: number,
    /**机器人套餐类型 */
    type: 'free' | string,
    /**机器人订单号 */
    id: string,
    /**机器人套餐持续时间至 */
    type_end_ts: number,
    /**机器人使用的插件uuid */
    plugin: string[]
}

/**一个自己的机器人 */
export  interface MyBot extends Base_MyBot {
    /**机器人密码 */
    bot_pwd: string,
}

/**可以对外公布的自己的机器人 */
export interface Base_MyBot {
    /** 机器人QQ */
    bot_uin: number,
    /**机器人添加时间 */
    start_ts: number,
    /**机器人过期时间 */
    end_ts: number,
    /**机器人套餐类型 */
    type: 'free' | string,
    /**机器人套餐持续时间至 */
    type_end_ts: number
    /**机器人订单号 */
    id: string,
    /**机器人使用的插件uuid */
    plugin: string[]
}

/**服务器固定的设备信息 */
export interface DeviceInfo {
    cpu: {
        model: string,
        number: number,
        speed: number
    },
    system: {
        type: string,
        version: string,
        arch: string
    },
    mem: {
        free: number,
        total: number
    }

}


/** 服务器设备实时信息 */
export interface DeviceInfo_Effectiveness {
    cpu_speed: number[],
    cpu_load: string,
    free_mem: number
}