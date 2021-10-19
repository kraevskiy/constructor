import cls from './Souvenirs.module.scss';
import clsParent from '../../Home.module.scss';
import { SouvenirsProps } from './Souvenirs.props';
import cn from 'classnames';
import { BlockHead } from '../../../../components/';
import { reg1, reg2, reg3, reg4 } from '../../../../images';

export const Souvenirs = ({data, lang}: SouvenirsProps): JSX.Element => {
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className={cn(clsParent.decor, cls.decor1)}>
				<img src={reg3} alt=""/>
				<img src={reg2} alt=""/>
			</div>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title[lang]}
				</BlockHead>
				<ul className={cls.list}>
					{data.items.map(i => (
						<li key={i._id}>
							<img src={`${process.env.REACT_APP_IMAGE_DOMAIN}${i.image}`} alt={i.title?.[lang]}/>
							<p>
								{i.title[lang]}
							</p>
						</li>
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
