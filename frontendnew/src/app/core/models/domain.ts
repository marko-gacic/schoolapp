export interface Student {
    id: number;
    indexNumber: number;
    indexYear: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    currentYearOfStudy: number;
    city: City;

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
    city: number;

}

export interface Professor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: number;
    relocationDate: Date;
    city: City;
}

export interface ProfessorDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: number;
    relocationDate: Date;
    city: number;
}

export interface Sub {
    id: number;
    name: string;
    description: string;
    noOfESP: number;
    yearOfStudy: number;
    semester: string;
}

export interface SubDTO {
    id: number;
    name: string;
    description: string;
    noOfESP: number;
    yearOfStudy: number;
    semester: string;
}

export interface City {
    zip_code: number;
    name: string;

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