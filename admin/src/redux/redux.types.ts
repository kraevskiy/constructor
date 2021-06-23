import { TypesApp, TypesUser } from './types';

export interface StateUserOrderLayout {
	title: string;
	_id: string;
}

export interface StateUserOrder {
	status: 'accepted' | 'new' | 'progress' | 'completed';
	layouts: StateUserOrderLayout[];
	user: string;
	paymentIntent?: 'hold' | 'succeeded';
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface StateUserLayout {
	user?: string;
	title: string;
	slash?: string;
	config: string;
	files: string[];
	instance: string;
	preview?: string;
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface RegisterUserModel {
	email: string;
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export type RolesUser = 'admin' | 'user' | 'visitor';

export interface StateUser {
	access_token: string;
	isLoggedIn: boolean;
	initAutologin: boolean;
	passwordHash?: string;
	email: string;
	_id: string;
	role: RolesUser;
	login: string;
}

export interface StateApp {
	loading: boolean;
}

export interface ActionType<T = TypesUser | TypesApp, P = StateUser | StateApp> {
	type: T;
	payload?: P;
}

export interface DecodeTokenTypes {
	email: string;
	iat: number;
	role: RolesUser;
	_id: string;
}
