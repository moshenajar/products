import { User } from "src/guards/user.entity";

declare module 'express-serve-static-core'  {
    interface Request {
       user?: User
    }
 }