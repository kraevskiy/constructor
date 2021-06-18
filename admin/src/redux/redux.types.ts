import { TypesApp, TypesUser } from './types';

export interface StateUserOrdersLayout {
	title: string;
	_id: string;
}

export interface StateUserOrders {
	status: 'accepted' | 'new' | 'progress' | 'completed';
	layouts: StateUserOrdersLayout[];
	user: string;
	paymentIntent?: 'hold' | 'succeeded';
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface StateUserLayouts {
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

export type RolesUser = 'admin' | 'user' | 'visitor';

export interface StateUser {
	access_token: string,
	isLoggedIn: boolean,
	initAutologin: boolean,
	user: {
		email: string;
		_id: string;
		role: RolesUser;
		login: string;
	},
	orders: StateUserOrders[],
	layouts: StateUserLayouts[]
}

export interface StateApp {
	loading: boolean;
}

export interface ActionType<T = TypesUser | TypesApp, P = StateUser | StateApp> {
	type: T;
	payload?: P | null;
}

export interface DecodeTokenTypes {
	email: string;
	expiresIn: string | number;
	iat: number;
	role: RolesUser;
	user: string;
	_id: string;
}
