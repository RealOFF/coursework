export interface IGetById {
	getById(id: string): Promise<any>;
}

export interface IGetSkipTake {
	getSkipTake(skip: string, take: string): Promise<any>;
}

export interface IDeleteById {
	deleteById(id: string): Promise<any>;
}

export interface ICreate<T> {
	create(data: T): Promise<any>;
}

export interface IUpdate<T> {
	update(data: T): Promise<any>;
}
