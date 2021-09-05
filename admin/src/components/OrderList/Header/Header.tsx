import cls from './Header.module.scss';
import { HeaderProps } from './Header.props';

const Header = ({titles}: HeaderProps): JSX.Element => {

	return (
		<div className={cls.head}>
			{titles.map(t => (
				<div className={cls.title} key={t}>
					{t}
				</div>
			))}
		</div>
	);
};

export default Header;
