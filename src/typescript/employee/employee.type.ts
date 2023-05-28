import { IUserReturnWithoutEmployee } from "../user/user.type"

export interface IEmployeeCreate {
    firstName: string,
    lastName: string,
    age: string,
    address: string,
}

export interface IEmployeeReturnWithoutUser {
    id: string,
    firstName: string,
    lastName: string,
    age: string,
    address: string,
}

export interface IEmployeeReturnWithUser {
        
    userId: IUserReturnWithoutEmployee,
}

export interface IEmployeeReturnManyWithUser {
    employees: IEmployeeReturnWithoutUser[],
    user: IUserReturnWithoutEmployee, 
}