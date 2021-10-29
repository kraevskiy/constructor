export const API = {
	admin: process.env.NODE_ENV === 'development' ? 'http://admin.arter.local' : process.env.NEXT_PUBLIC_DOMAIN,
	host: process.env.NODE_ENV === 'development' ? 'http://admin.arter.local' : process.env.NEXT_PUBLIC_DOMAIN,
	pages: {
		home: 'api/page/slag/home',
		404: 'api/page/slag/404',
		login: 'api/auth/login',
		registration: 'api/auth/register'
	},
};
