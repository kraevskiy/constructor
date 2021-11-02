import cls from './Contacts.module.scss';
import clsParent from '../../Home.module.scss';
import { ContactsProps } from './Contacts.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../../../components';
import Form from './Form';

export const Contacts = ({data, lang}: ContactsProps): JSX.Element => {
	if (!data) return <></>;
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className="container">
				<FadeInWhenVisible>
					<BlockHead className={cls.title}>
						{data.title[lang]}
					</BlockHead>
				</FadeInWhenVisible>
				<FadeInWhenVisible>
					<p className={cls.subtitle}>
						{data.additional}
					</p>
				</FadeInWhenVisible>
				<div className={cls.body}>
					<FadeInWhenVisible>
						<Form/>
					</FadeInWhenVisible>
					<ul className={cls.list}>
						{
							data.items.map(i => (
								<FadeInWhenVisible tag="li" key={i._id}>
									<a href={i.link}>
										{i.showLink}
									</a>
								</FadeInWhenVisible>
							))
						}
					</ul>
				</div>
			</div>
		</section>
	);
};
