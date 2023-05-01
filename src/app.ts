import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: false,
}));

// app.use('/api/v1/todo', todoRouter);

// app.use('/users', userRouter);

app.use((req:Request, res:Response) => {
    res.status(404).json({
        message: 'Not found',
    })
})

app.use ((err: any, req:Request, res:Response, next: NextFunction) => {
    const {status = 500, message = "Server Error"} = err;
    res.status(status).json({
        status: "FAILURE",
        message
    })
})

export default app;