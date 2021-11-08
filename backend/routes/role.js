import express from "express";
import role from "../controllers/role.js";
const router  = express.Router()


router.post("/registerRole", role.registerRole);
router.get("/listRole", role.listRole);

export default router   