import cn from 'classnames';
import cls from './Burger.module.scss';
import { AppContext } from '../../context/app.context';
import { useContext } from 'react';

export const Burger = (): JSX.Element => {
	const appContext = useContext(AppContext);
	return (
		<button
			onClick={appContext.toggleNavigation}
			aria-label="menu toggle"
			className={cn(cls.burger, {
				[cls.active]: appContext.isShowNavigation
			})}
		>
			<span/><span/><span/>
		</button>
	);
};
