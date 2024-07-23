import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

// all defined routes from the auth.controller.js

router.post("/register" ,register)
router.post("/login" , login)
router.post("/logout" ,logout)


export default router; // exporting the router , to be imported from the app.js