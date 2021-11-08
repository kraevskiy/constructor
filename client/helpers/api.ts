export const API = {
	admin: process.env.NODE_ENV === 'development' ? 'http://admin.arter.local' : 'http://constructor.chost.com.ua',
	host: process.env.NODE_ENV === 'development' ? 'http://admin.arter.local' : 'http://constructor.chost.com.ua',
	pages: {
		home: 'api/page/slag/home',
		404: 'api/page/slag/404',
		login: 'api/auth/login',
		registration: 'api/auth/register'
	},
	mail: {
		message: '/api/mail/feedback'
	}
};
