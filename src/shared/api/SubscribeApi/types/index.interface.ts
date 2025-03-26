export interface IUserData {
	name: string;
	email: string;
}

export interface ISubstribeResponce {
	userData: IUserData
}

export interface ISubstribeRequest {
	message: string;
	error?: string;
}