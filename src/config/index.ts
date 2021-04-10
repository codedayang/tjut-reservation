// 请求连接前缀
// export const baseUrl = process.env.NODE_ENV === 'production' ? PROD_HOST : DEV_HOST;
const isMock = true
export const mockUrl = "http://192.168.115.38:9527"
export const baseUrl = isMock?mockUrl:"https://flos.dayang.link:3062";
// 输出日志信息
export const noConsole = false;
