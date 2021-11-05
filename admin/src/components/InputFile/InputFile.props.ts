import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputFileProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
	url: string | undefined;
	setValue: (url: string) => void;
}
