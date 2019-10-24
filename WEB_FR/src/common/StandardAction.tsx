export interface StandardAction<T> {
    type: string | symbol | any;
    payload?: T;
    error?: boolean | any;
    meta?: any;
}

export interface StandardResponse<T> {
    result: T;
    errors?: ResponseError[];
    hasErrors?: boolean;
}

export interface ResponseError {
    code: number;
    message: string;
}