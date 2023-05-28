import { Request, Response, Router } from "express";

import { ensureAuthorization } from "../../../middleware/auth/ensureAuthorization";
import { verifyBodyBySchema } from "../../../middleware/verifyBodyBySchema/verifyBodyByShema.middleware";
import { employeeCreateSchema } from "../../../entities/employee/employee.entity";
import { addEmployee } from "../../../controllers/employee/addEmployee.controller";
import { getAllEmployee } from "../../../controllers/employee/getAllEmployee.controller";

const router = Router();


router.get("/", ensureAuthorization,getAllEmployee);
router.get('/:id', ensureAuthorization, (req:Request, res:Response) => res.send("Get a single employee"));
router.post('/', ensureAuthorization, verifyBodyBySchema(employeeCreateSchema), addEmployee);
// router.post('/', ensureAuthorization, verifyBodyBySchema(), addEmployee);

router.put('/:id', ensureAuthorization, (req:Request, res:Response) => res.send("Put a single employee"));
router.delete('/:id', ensureAuthorization, (req:Request, res:Response) => res.send("Remove a single employee"));

export default router;