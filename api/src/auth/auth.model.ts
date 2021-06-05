export class AuthModel {
	email: string;
	passwordHash: string;
	login: string;
	orders: {
		id: string;
		status: 'accepted' | 'new' | 'progress' | 'completed';
		createdAt: Date;
	}[];
}
