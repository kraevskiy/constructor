import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface BlockHeadProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children: ReactNode;
	line?: 'orange' | 'green';
	tag?: 'h2' | 'h3' | 'h4' | 'p'
}
