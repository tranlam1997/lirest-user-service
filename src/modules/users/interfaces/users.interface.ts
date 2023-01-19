export interface CreateUserBodyRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
}

export type UpdateUserBodyRequest = Partial<CreateUserBodyRequest>;
