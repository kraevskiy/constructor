import { HeaderProps } from "./Header.props";
import {Burger, LanguageSwitcher} from '../../../components';
import cls from './Header.module.scss';
import cn from 'classnames';
import { logo1, logo2 } from '../../../public/static/images';
import { login } from '../../../public/static/images/icons';
import Image from 'next/image';
import Link from 'next/link';
import { API } from '../../../helpers/api';
import { paths } from '../../../helpers/paths';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {

	return (
		<header
			className={cn('grid', cls.header, className)}
			{...props}
		>
			<Link href={'/'}>
				<a
					rel="noopener noreferrer"
					className={cls.logo}>
					<span>
						home page
					</span>

					<Image
						src={logo1.src}
						width={logo1.width}
						height={logo1.height}
						alt="Logo main page"
					/>
					<Image
						src={logo2.src}
						width={logo2.width}
						height={logo2.height}
						alt="Logo main page"
					/>
				</a>
			</Link>
			{/*<div className={cls.catalog}>*/}
			{/*	<Burger active={isOpenCatalog} onClick={handleShowCatalog}/>*/}
			{/*	<span>КАТАЛОГ</span>*/}
			{/*</div>*/}
			<div className={cls.menu}>
				<a href={`${API.admin}${paths.login}`} className={cls.login}>
					<Image
						src={login.src}
						width={25}
						height={25}
						alt="Cabinet link"
					/>
				</a>
				<Burger/>
				<LanguageSwitcher/>
			</div>
		</header>
	);
};

export default Header;
