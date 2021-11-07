import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: string;
	titles: string[];
	title: string;
	handleDelete: (id: string) => void;
	deleteText?: string | boolean;
	linkText?: string | boolean;
	addOrder?: string | boolean;
	preview?: string;
	createdAt: Date;
	updatedAt: Date;
	userName?: string | null;
	onOrder?: boolean;
}
