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
    title: Title;
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
    title: number;
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

export interface CityDTO {
    zip_code: number;
    name: string;

}

export interface Title {
    id: number;
    titleName: string;

}

export interface TitleDTO {
    id: number;
    titleName: string;

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

export interface ExamPeriod {
    id: number
    name: string
    start: Date | string
    end: Date | string
    status: boolean
}

export interface ExamPeriodDTO {
    id: number
    name: string
    start: Date | string
    end: Date | string
    status: boolean
}

export interface Exam {
    id: number
    name: string
    date: Date | string
    start: Date | string
    end: Date | string
    status: boolean
    examPeriod: ExamPeriod
    subject: Sub
    professor: Professor
    students: Student[]
}

export interface ExamDTO {
    id: number
    name: string
    date: Date | string
    start: Date | string
    end: Date | string
    status: boolean
    examPeriod: number
    subject: number
    professor: number
    students: number[]
}

export interface ExamRegistration {
    id: number
    exam: Exam
    student: Student
    status: string
}

export interface ExamRegistrationDTO {
    id: number
    exam: number
    student: number
    status: string
}

