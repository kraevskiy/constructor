import cls from './Souvenirs.module.scss';
import clsParent from '../../Home.module.scss';
import { SouvenirsProps } from './Souvenirs.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../../../components/';
import { reg1, reg2, reg3, reg4 } from '../../../../images';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../../routes/paths';

export const Souvenirs = ({data, lang}: SouvenirsProps): JSX.Element => {
	if (!data) return <></>;
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className={cn(clsParent.decor, cls.decor1)}>
				<img src={reg3} alt=""/>
				<img src={reg2} alt=""/>
			</div>
			<div className="container">
				<FadeInWhenVisible>
					<BlockHead className={cls.title}>
						{data.title[lang]}
					</BlockHead>
				</FadeInWhenVisible>
				<ul className={cls.list}>
					{data.items.map(i => (
						<FadeInWhenVisible tag="li" key={i._id}>
							<NavLink to={paths.constructor}>
								<img src={i.image} alt={i.title?.[lang]}/>
								<p>
									{i.title[lang]}
								</p>
							</NavLink>
						</FadeInWhenVisible>
					))}
				</ul>
			</div>
			<div className={cn(clsParent.decor, cls.decor2)}>
				<img src={reg4} alt=""/>
				<img src={reg1} alt=""/>
			</div>
		</section>
	);
};
