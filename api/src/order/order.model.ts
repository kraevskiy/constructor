export class OrderModel {
	_id: string;
	status: 'accepted' | 'new' | 'progress' | 'completed';
	// reference layout
	layout: string;
	//reference user
	user: string;
	date: string;
	createdAt: Date;
}
