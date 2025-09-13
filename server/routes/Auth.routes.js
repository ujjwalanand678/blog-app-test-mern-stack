import express from "express";
import { userRegister } from "../controller/Auth.controller.js";

const route = express.Router();

//http://localhost:8080/api/v1/auth/registeruser
route.post("/registeruser", userRegister)

export default route;