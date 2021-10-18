import cls from './Contacts.module.scss';
import clsParent from '../../Home.module.scss';
import { ContactsProps } from './Contacts.props';
import cn from 'classnames';
import { BlockHead } from '../../../../components';
import Form from './Form';

export const Contacts = ({data, lang}: ContactsProps): JSX.Element => {

	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title[lang]}
				</BlockHead>
				<p className={cls.subtitle}>
					{data.additional}
				</p>
				<div className={cls.body}>
					<Form />
					<ul className={cls.list}>
						{
							data.items.map(i=>(
								<li key={i._id}>
									<a href={i.link}>
										{i.showLink}
									</a>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		</section>
	);
};
