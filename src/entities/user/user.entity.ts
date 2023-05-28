import Joi from 'joi';

export const userRegisterShema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).required(),
    password: Joi.string().trim().min(1).max(20).required(),
})

export const userLoginShema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(1).max(20).required(),
})

// export const userReturnShema = Joi.object({
//     id: Joi.string().uuid().default().id(),
//     email: Joi.string().email().required(),
//     name: Joi.string().min(1).required(),
//     password: Joi.string().trim().min(1).max(20).required(),
//     createdAt: Joi.date().required()
// })

// export const userShema = Joi.object({
//     id: Joi.string().uuid().default().id(),
//     email: Joi.string().email().required(),
//     name: Joi.string().min(1).required(),
//     password: Joi.string().min(6).max(20).required,
//     createdAt: Joi.string(),
//     createEmployee: Joi.array(),
// })

// export const userSchemas = {
//     userLogin: {
//         shema: userLoginShema,
//         name: "userLoginShema",
//         type: typeof userLoginShema,
//     },
//     userRegister: {
//         shema: userRegisterShema,
//         name: "userRegisterShema",
//         type: typeof userRegisterShema,
//     }
// }

