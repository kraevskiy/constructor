import cn from 'classnames';
import cls from './Navigation.module.scss';
import { NavigationProps } from './Navigation.props';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { paths } from '../../../helpers/paths';
import { useTranslation } from 'next-i18next';
import { API } from '../../../helpers/api';

const Navigation = ({...props}: NavigationProps): JSX.Element => {
	const router = useRouter();
	const {t} = useTranslation();
	const {page, isShowNavigation} = useContext(AppContext);

	const variants = {
		hidden: {opacity: 0},
		visible: {opacity: 1}
	};

	const getPartContacts = (items: typeof page.contacts.items, part: 1 | 2 = 1): typeof page.contacts.items => {
		const delimiter = Math.floor(items.length / 2);
		return part === 1
			? items.slice(part - 1, delimiter)
			: items.slice(delimiter, items.length);
	};

	return (
		<motion.div
			variants={variants}
			animate={isShowNavigation ? 'visible' : 'hidden'}
			className={cn(cls.wr, {
				[cls.show]: isShowNavigation
			})}
		>
			<div {...props} className={cn('grid', cls.body)}>
				<nav className={cls.nav}>
					<ul className={cls.list}>
						<li className={cls.item}>
							<Link href={paths.index}>
								<a className={cn(cls.link, {
									[cls.activeLink]: paths.index === router.pathname
								})}>
									{t('page.index')}
								</a>
							</Link>
						</li>
						<li className={cls.item}>
							<a href={`${API.admin}${paths.constructor}`} className={cn(cls.link)}>
								{t('page.constr')}
							</a>
						</li>
						<li className={cls.item}>
							<a href={`${API.admin}${paths.login}`} className={cn(cls.link)}>
								{t('page.login')}
							</a>
						</li>
						<li className={cls.item}>
							<a href={`${API.admin}${paths.registration}`} className={cn(cls.link)}>
								{t('page.registration')}
							</a>
						</li>
					</ul>
				</nav>
				<div className={cls.address}>
					<ul className={cls.emailList}>
						{
							page.contacts?.items && getPartContacts(page.contacts.items).map((item) =>
								<li key={item._id}>
									<a href={item.link}>
										{item.showLink}
									</a>
								</li>
							)
						}
					</ul>
					<ul>
						{
							page.contacts.items && getPartContacts(page.contacts.items, 2).map((item) =>
								<li key={item._id}>
									<a href={item.link}>
										{item.showLink}
									</a>
								</li>
							)
						}
					</ul>
				</div>
			</div>
		</motion.div>

	);
};

export default Navigation;
