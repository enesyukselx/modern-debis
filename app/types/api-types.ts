export interface ISession {
    cookie?: string;
}

export type TUserName = string | null;
export type TPassword = string | null;
export type TSemester = string | null;
export type TSession = string | null;
export type TCourse = string | null;

export interface ILoginData {
    username: TUserName;
    password: TPassword;
    emailHost: "ogr.deu.edu.tr";
}

export interface IConfig {
    headers: {
        "Content-Type"?: "application/x-www-form-urlencoded";
        Host?: "debis.deu.edu.tr";
        Cookie?: string;
    };
    responseType?: "arraybuffer";
}

export interface IStudent {
    name?: string;
    number?: string;
    year?: string;
    faculty?: string;
    department?: string;
    advisor?: string;
}

type TResult = {
    name: string;
    avarage?: string;
    result: string;
};

export interface ICourseArr {
    results?: TResult[];
    credit?: string;
    type?: string;
    professor?: string;
    status?: string;
}

export interface ICourse {
    credit: string;
    type: string;
    professor: string;
    status: string;
    results: string[];
}

export interface ISchedule {
    time: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
}
