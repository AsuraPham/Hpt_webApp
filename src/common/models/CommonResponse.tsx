export default interface CommonResponse<T> {
    errorId?: number;
    errorMessage?: string;
    meta?: any;
    result: T;
    hasErrors?: boolean;
    errors?: any[];
  }