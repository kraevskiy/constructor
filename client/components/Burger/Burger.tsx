import { BurgerProps } from './Burger.props';
import cn from 'classnames';
import cls from './Burger.module.scss';
import { AppContext } from '../../context/app.context';
import { useContext } from 'react';

export const Burger = (props: BurgerProps): JSX.Element => {
	const appContext = useContext(AppContext);
	return (
		<button
			onClick={appContext.toggleNavigation}
			className={cn(cls.burger, {
				[cls.active]: appContext.isShowNavigation
			})}
		>
			<span/><span/><span/>
		</button>
	);
};
