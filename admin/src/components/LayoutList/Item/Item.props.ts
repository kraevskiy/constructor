import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: string;
	title: string;
	handleDelete: (id: string) => void;
	deleteText: string;
	linkText: string;
	createdAt: Date;
	updatedAt: Date;
}
