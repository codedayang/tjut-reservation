import Request from 'request';
export interface BaseRes<T> {
  code: string;
  message: string;
  data: T;
}

export interface LoginReq {
  code: string;
}

export type LoginRes = BaseRes<{
  needAuth: boolean;
  token: string;
}>;

export const login = async (req: LoginReq) => await Request<LoginReq, LoginRes>({
  url: '/login',
  method: "POST",
  data: req
});

