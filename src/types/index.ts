import { Hidden } from "@mui/material";

export type Cafe = {
    id: string;
    name: string;
    description: string;
    logo: string;
    location: string;
}




export type Employee = {
    id: string;
    name: string;
    gender: string;
    email_address: string;
    phone_number: number;
}

export interface EmployeeCreateUpdate extends Employee {
    cafe_id: string;
}

export interface EmployeeDetail extends Employee {
    cafe: string;
    start_date: Date;
}

export interface EmployeeDetailView extends EmployeeDetail {
    cafe: string;
    days_worked: number;
}


export const EmployeeDetailViewColDef = [
    {field: "id"},
    {field: "name"},
    {field: "gender"},
    {field: "email_Address", headerName: "Email Address"},
    {field: "phone_Number", headerName: "Phone Number"},
    {field: "cafe"},
    {field: "days_Worked", headerName: "Days Worked"},
    {field: "start_Date", headerName: "Start Date", hide: true}
]


export type CafeEmployee = {
    id: number;
    cafe_id: string;
    employee_id: string;
}