import express from "express";
import { updateUser } from "../controller/User.controller.js";
import { authorize } from "../auth/VerifyToken.js";

const route = express.Router();

// http://localhost:8080/api/v1/user/updateuser/12345
route.put("/updateuser/:id" ,authorize, updateUser)

export default route;