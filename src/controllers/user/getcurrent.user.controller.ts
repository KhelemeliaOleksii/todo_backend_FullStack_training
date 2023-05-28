import { Request, Response } from 'express';
import createError from '../../utils/createError/createError';
import { IUserLogin } from '../../typescript/user/user.type';

/**
 * @router GET /api/v1/user/current
 * @desc get current user
 * @access Private
*/
export const getcurrent = (req: Request, res: Response) => {
    const user: IUserLogin | undefined = res.locals?.user;
   
    if (!user) {
        return res.status(400).json({
            status: "Error",
            code: 401,
            message: "User is not loggined"
        })
        // throw createError({
        //     status: 401,
        //     messageDev: "Get current user controller. User is not logined",
        // })
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        data: {
            user,
        }
    });
}

