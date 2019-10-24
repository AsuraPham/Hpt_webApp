export interface AuthState {
    isLoading?: boolean;
    userInfo?: UserModel;
}

export interface UserModel {
    userId?: string;
    fullName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    profileUrl?: string;
}
