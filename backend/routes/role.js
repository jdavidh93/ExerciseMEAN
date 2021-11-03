import express from "express";
import role from "../controllers/role.js";
const router  = express.Router()


router.post("/registerRole", role.registerRole);

export default router   