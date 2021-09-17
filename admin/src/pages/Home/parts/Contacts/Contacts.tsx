import cls from './Contacts.module.scss';
import clsParent from '../../Home.module.scss';
import { ContactsProps } from './Contacts.props';
import cn from 'classnames';

export const Contacts = ({data}: ContactsProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			Contacts
		</section>
	);
};
