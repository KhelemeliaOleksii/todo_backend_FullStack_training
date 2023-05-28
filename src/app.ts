import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import loger from 'morgan';
import userRouter from './api/v1/user/user.router';
import employeeRouter from './api/v1/employee/employee.router';

const app = express();

// one can loger requests to the server's
// const morganLogerFormat = app.get('env') === "development" ? 'dev' : "short" 
// app.use(loger(morganLogerFormat));

app.use(cors());

// one can send data via request body
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

// app.use('/api/v1/todo', todoRouter);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/employee', employeeRouter);
// app.use('/')
app.use((req:Request, res:Response) => {
    res.status(404).json({
        message: 'Not found',
    })
})

app.use ((err: any, req:Request, res:Response, next: NextFunction) => {
    const {status = 500, message = "Server Error"} = err;
    res.status(status).json({
        status: "Failure",
        code: status,
        message,
    })
})

export default app;