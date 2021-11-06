export const validate: {
	text: (value:string | undefined, minLength?: number) => boolean;
	phone: (value:string | undefined) => boolean;
	email: (value:string | undefined) => boolean;
	login: (value:string | undefined) => boolean;
} = {
	text: (value:string | undefined, minLength?: number): boolean => {
		if(!value) return false;
		if(minLength) return value.toString().length >= minLength;
		const regex = RegExp(/^.{3,}$/);
		return regex.test(value);
	},
	phone: (value: string | undefined): boolean => {
		if(!value) return false;
		const regex = RegExp(/^\d{9,14}$/);
		return regex.test(value.toString());
	},
	email: (value: string | undefined): boolean => {
		if(!value) return false;
		const regex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return regex.test(value);
	},
	login:(value: string | undefined): boolean => {
		if(!value) return false;
		const regex = RegExp(/^[a-zA-Z0-9]{2,}$/);
		return regex.test(value);
	}
};
