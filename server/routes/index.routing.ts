import { Express } from "express";
import authRouting from "./auth.routing";
import userRouting from "./user.routing";
import blogRouting from "./blog.routing";
import categoryRouting from "./category.routing";

const BASE_URL = "/api";

const createRouter = (app: Express) => {
    app.use(BASE_URL + "/auth", authRouting);
  
    app.use(BASE_URL + "/user", userRouting);
    app.use(BASE_URL + "/blog", blogRouting);
    app.use(BASE_URL + "/category", categoryRouting);
  
}

export default createRouter;