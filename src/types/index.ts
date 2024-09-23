
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
    email_address: string;
    phone_number: number;
    gender: string;
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





export type CafeEmployee = {
    id: number;
    cafe_id: string;
    employee_id: string;
}