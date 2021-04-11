// 请求连接前缀
// export const baseUrl = process.env.NODE_ENV === 'production' ? PROD_HOST : DEV_HOST;
const isMock = false
// export const mockUrl = "http://192.168.1.105:9527"
export const mockUrl = "http://192.168.115.59:9527"
export const baseUrl = isMock?mockUrl:"http://49.232.223.89:50007";
// 输出日志信息
export const noConsole = false;
