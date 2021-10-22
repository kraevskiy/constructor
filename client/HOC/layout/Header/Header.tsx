import { HeaderProps } from "./Header.props";
import {Burger, LanguageSwitcher} from '../../../components';
import cls from './Header.module.scss';
import cn from 'classnames';
import { logo } from '../../../public/static/images';
import Image from 'next/image';
import Link from 'next/link';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {

	return (
		<header
			className={cn('grid', cls.header, className)}
			{...props}
		>
			<Link href={'/'}>
				<a className={cls.logo}>
					<Image
						src={logo}
						width={logo.width}
						height={logo.height}
						// objectFit={'fill'}
						alt=''
					/>
				</a>
			</Link>
			{/*<div className={cls.catalog}>*/}
			{/*	<Burger active={isOpenCatalog} onClick={handleShowCatalog}/>*/}
			{/*	<span>КАТАЛОГ</span>*/}
			{/*</div>*/}
			<div className={cls.menu}>
				<Burger/>
				<LanguageSwitcher/>
			</div>
		</header>
	);
};

export default Header;
