import express from "express";
import controller from "../controllers/users";

const router = express.Router();

router
    .post("/login",controller.login)
    .post("/register",controller.register)

export = router;