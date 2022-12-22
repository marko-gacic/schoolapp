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
    periodName: string
    start: Date | string
    end: Date | string
    status: boolean
    exam: Exam
}

export interface ExamPeriodDTO {
    id: number
    periodName: string
    start: Date | string
    end: Date | string
    status: boolean
}

export interface Exam {
    id: number
    subject: Sub
    professor: Professor
    date: Date | string
    examPeriod: ExamPeriod
}

export interface ExamDTO {
    id: number
    subject: number
    professor: number
    date: Date | string
    examPeriod: number

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

