import createError from "../../utils/createError/createError";
import { NextFunction, Request, Response } from "express";
import Joi, { isSchema } from 'joi';

export const verifyBodyBySchema =
    (shema: Joi.AnySchema = Joi.object({})) =>
        async (req: Request, res: Response, next: NextFunction) => {

            const isSchemaValid = isSchema(shema);
            if (!isSchemaValid) {
                next(createError({
                    status: 400,
                    messageDev: "Middleware verifyBodyBySchema. Invalid validation schema"
                }))
            }

            const { body } = req;

            if (!body) {
                next(createError({
                    status: 400,
                    messageDev: "Middleware verifyBodyBySchema. Empty body",
                }))
            }

            try {
                await shema.validateAsync(body);
                next();
            } catch (error) {
                next(createError({
                    status: 400,
                    messageDev: "Middleware verifyBodyBySchema. Invalid request body"
                }))
            }
        }