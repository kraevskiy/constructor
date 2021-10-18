import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	color?: 'blue' | 'orange' | 'yellow' | 'red' | 'green' | 'violet' | 'white' | 'dark';
}
