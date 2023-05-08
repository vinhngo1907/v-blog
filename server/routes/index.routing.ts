import { Express } from "express";
import authRouting from "./auth.routing";
import userRouting from "./user.routing";

const BASE_URL = "/api";

const createRouter = (app: Express) => {
    app.use(BASE_URL + "/auth", authRouting);
  
    app.use(BASE_URL + "/user", userRouting);
  
}

export default createRouter;