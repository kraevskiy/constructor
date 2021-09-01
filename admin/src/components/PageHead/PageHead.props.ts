import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PageHeadProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children: ReactNode;
	paddingTop?: 'small' | 'big';
	text?: string;
	line?: 'orange' | 'green'
}
