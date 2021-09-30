import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface BlockHeadProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children: ReactNode;
	line?: 'orange' | 'green';
}
