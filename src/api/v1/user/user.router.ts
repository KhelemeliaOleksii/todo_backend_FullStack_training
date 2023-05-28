import {Router } from "express";
const router = Router();

import { getcurrent } from "../../../controllers/user/getcurrent.user.controller";
import { login } from "../../../controllers/user/login.user.controller";
import { register } from "../../../controllers/user/register.user.controllers";

import { ensureAuthorization } from "../../../middleware/auth/ensureAuthorization";
import { verifyBodyBySchema } from "../../../middleware/verifyBodyBySchema/verifyBodyByShema.middleware";
import { userLoginShema, userRegisterShema } from "../../../entities/user/user.entity";

// /api/v1/user/login 
router.post('/login', verifyBodyBySchema(userLoginShema), login)

// /api/v1/user/register 
router.post('/register',verifyBodyBySchema(userRegisterShema), register)
// router.post('/register',verifyBodyBySchema(), register)

// /api/v1/user/current 
router.get('/current', ensureAuthorization, getcurrent)

export default router;