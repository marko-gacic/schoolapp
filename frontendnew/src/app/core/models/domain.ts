export interface Student {
    id: number;
    indexNumber: number;
    indexYear: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    currentYearOfStudy: number;
    city_id: City;

}

export interface StudentDTO {
    id: number;
    indexNumber: number;
    indexYear: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    currentYearOfStudy: number;
    city_id: number;

}

export interface Professor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: number;
    relocationDate: Date;
    city_id: City;
}

export interface ProfessorDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: number;
    relocationDate: Date;
    city_id: number;
}

export interface City {
    name: string;
    postalCode: number;
}

export interface User {
    firstName: any;
    lastName: any;
    id: number;
    userName: string;
    password: string;
    email: string;
    role: string;
    status: string;
}