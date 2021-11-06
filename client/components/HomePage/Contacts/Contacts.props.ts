import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ContactsPage } from '../../../interfaces/HomePropsInterface';

export interface ContactsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: ContactsPage;
	lang: string;
}
