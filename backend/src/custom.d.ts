import * as Koa from "koa";

declare module "koa" {
    interface Request {
      token:any;
      body:any;
    }
    interface Context {
      params:any;
    }
}