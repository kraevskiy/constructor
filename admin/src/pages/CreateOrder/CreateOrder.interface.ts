export interface ICreateOrderFormInterface {
	paymentType?: string;
	delivery: string;
	address: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	count: string;
	comment?: string;
	price: string;
}
