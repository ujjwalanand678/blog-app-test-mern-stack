import express from "express";
import { userLogin, userRegister } from "../controller/Auth.controller.js";

const route = express.Router();

//http://localhost:8080/api/v1/auth/registeruser
route.post("/registeruser", userRegister)

//http://localhost:8080/api/v1/auth/loginuser
route.post("/loginuser", userLogin)


export default route;