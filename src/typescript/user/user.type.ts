import { IEmployeeReturnWithoutUser } from "../employee/employee.type";

export interface IUserRegister {
    email: string,
    name: string,
    password: string,
}

export interface IUserLogin {
    id: string,
    email: string,
    // name: string,
    // password: string,
}

export interface IUserReturnWithoutEmployee {
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: Date,
}

export interface IUserReturnWithManyEmployees {
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    employee: IEmployeeReturnWithoutUser[],
}


