export enum TypesUser {
	createUser = 'USER/CREATE_USER',
	editUser = 'USER/EDIT_USER',
	login = 'USER/LOGIN',
	autologin = 'USER/AUTOLOGIN',
	logout = 'USER/LOGOUT',
	delete = 'USER/DELETE',
}

export enum TypesOrder {
	getOrders = 'ORDER/GET_ORDERS',
	createOrder = 'ORDER/CREATE_ORDER',
	deleteOrder = 'ORDER/DELETE_ORDER',
	editOrder = 'ORDER/EDIT_ORDER',
}

export enum TypesLayout {
	getLayouts = 'LAYOUT/GET',
	createLayout = 'LAYOUT/CREATE_LAYOUT',
	deleteLayout = 'LAYOUT/DELETE_LAYOUT',
	editLayout = 'LAYOUT/EDIT_LAYOUT'
}

export enum TypesApp {
	showLoader = 'APP/SHOW_LOADER',
	hideLoader = 'APP/HIDE_LOADER'
}
