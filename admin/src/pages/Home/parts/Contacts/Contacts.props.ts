import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ContactsPage } from '../../../../types/page';

export interface ContactsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: ContactsPage;
}
