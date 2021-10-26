import cn from 'classnames';
import { FooterProps } from './Footer.props';
import cls from './Footer.module.scss';
import { useRouter } from 'next/router';
import { useTranslation, i18n } from 'next-i18next';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';
import Link from 'next/link';
import { logo } from '../../../public/static/images';
import Image from 'next/image';
import { paths } from '../../../helpers/paths';
import { facebook, instagram, youtube } from '../../../public/static/images/icons';
import { API } from '../../../helpers/api';

const Footer = ({className, ...props}: FooterProps): JSX.Element => {
	const router = useRouter();
	const {t} = useTranslation();
	const {page} = useContext(AppContext);

	const getPartContacts = (items: typeof page.contacts.items, part: 1 | 2 = 1): typeof page.contacts.items => {
		const delimiter = Math.floor(items.length / 2);
		return part === 1
			? items.slice(part - 1, delimiter)
			: items.slice(delimiter, items.length);
	};

	return (
		<div className="container">
			<footer
				className={cn(className, cls.footer)}
				{...props}
			>
				<div className={cls.top}>
					<div className={cls.info}>
						<Link href="/">
							<a>
								<Image
									src={logo.src}
									width={logo.width}
									height={logo.height}
									alt="Logo main page"
								/>
							</a>
						</Link>
						<div className={cls.text}>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							Cum
							sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
						</div>
					</div>
					<span/>
					<div className={cls.nav}>
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
								<Link href={paths.constructor}>
									<a className={cn(cls.link, {
										[cls.activeLink]: paths.constructor === router.pathname
									})}>
										{t('page.constr')}
									</a>
								</Link>
							</li>
							<li className={cls.item}>
								<Link href={paths.login}>
									<a className={cn(cls.link, {
										[cls.activeLink]: paths.login === router.pathname
									})}>
										{t('page.login')}
									</a>
								</Link>
							</li>
							<li className={cls.item}>
								<Link href={paths.registration}>
									<a className={cn(cls.link, {
										[cls.activeLink]: paths.registration === router.pathname
									})}>
										{t('page.registration')}
									</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className={cls.email}>
						<ul>
							{
								page.contacts?.items && getPartContacts(page.contacts.items).map((item) =>
									<li key={item._id}>
										<Link href={item.link as string}>
											<a>
												<img src={`${API.host}${item.icon}`} width={16} height={16} alt={item.showLink}/>{item.showLink}
											</a>
										</Link>
									</li>
								)
							}
						</ul>
					</div>
					<div className={cls.phone}>
						<ul>
							{
								page.contacts?.items && getPartContacts(page.contacts.items, 2).map((item) =>
									<li key={item._id}>
										<Link href={item.link as string}>
											<a>
												<img src={`${API.host}${item.icon}`} width={16} height={16} alt={item.showLink}/>{item.showLink}
											</a>
										</Link>
									</li>
								)
							}
						</ul>
					</div>
				</div>
				<div className={cls.bottom}>
					<div className={cls.copyright}>
						Copyright © 2021 Arter Все права защищены.
					</div>
					<ul className={cls.socials}>
						<li>
							<a target="_blank" href="/">
								<Image
									src={instagram.src}
									width={instagram.width}
									height={instagram.height}
									alt="instagram"
								/>
							</a>
						</li>
						<li>
							<a target="_blank" href="/">
								<Image
									src={facebook.src}
									width={facebook.width}
									height={facebook.height}
									alt="facebook"
								/>
							</a>
						</li>
						<li>
							<a target="_blank" href="/">
								<Image
									src={youtube.src}
									width={youtube.width}
									height={youtube.height}
									alt="youtube"
								/>
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
