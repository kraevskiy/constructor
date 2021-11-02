import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface FadeInWhenVisibleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children: ReactNode;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'li';
}
