const initialState = {
	access_token: '',
	isLoggedIn: false,
	initAutologin: false,
	user: {
		email: '',
		_id: '',
		role: '',
		login: ''
	},
	orders:[],
	layouts: []
};

export const userReducer = (state = initialState, action: []) => {
	return state;
};
