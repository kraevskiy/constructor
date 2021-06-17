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
}

export interface StateUserLayouts {
	user?: string;
	title: string;
	slash?: string;
	config: string;
	files: string[];
	instance: string;
	preview?: string;
}

export interface StateUser {
	access_token: string,
	isLoggedIn: boolean,
	initAutologin: boolean,
	user: {
		email: string,
		_id: string,
		role: 'user' | 'admin' | 'visitor',
		login: string
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
	role: 'user' | 'admin' | 'visitor';
	user: string;
	_id: string;
}
