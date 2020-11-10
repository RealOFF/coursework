export interface IStudentService {
    getById(id: string): Promise<any>;
    getSkipTake(skip: string, take: string): Promise<any>;
    deleteById(id: string): Promise<any>;
    create(data: ICreateArguments): Promise<any>;
    update(data: IUpdateArguments): Promise<any>;
}

export interface ICreateArguments {
    firstName: string;
    lastName: string;
    patronymic?: string;
}

export interface IUpdateArguments extends ICreateArguments {
    id: number;
    groups: Array<any>;
}