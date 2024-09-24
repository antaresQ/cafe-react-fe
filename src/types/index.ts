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

export interface EmployeeDetailViewTable extends EmployeeDetailView {
    action: string;
}

export type CafeEmployee = {
    id: number;
    cafe_id: string;
    employee_id: string;
}