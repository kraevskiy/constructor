import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface LayoutProp extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children: ReactNode;
}
