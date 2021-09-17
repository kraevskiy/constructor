import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface InputFileProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
	url: string | undefined;
	setValue: (url: string) => void;
}
