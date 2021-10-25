import cls from './Souvenirs.module.scss';
import clsParent from './../Home.module.scss';
import { SouvenirsProps } from './Souvenirs.props';
import cn from 'classnames';
import { BlockHead } from '../../';
import { reg1, reg2, reg3, reg4 } from '../../../public/static/images';
import { API } from '../../../helpers/api';
import Image from 'next/image';

export const Souvenirs = ({data, lang}: SouvenirsProps): JSX.Element => {
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className={cn(clsParent.decor, cls.decor1)}>
				<img src={reg3.src} alt=""/>
				<img src={reg2.src} alt=""/>
			</div>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title?.[lang as string]}
				</BlockHead>
				<ul className={cls.list}>
					{data.items.map(i => (
						<li key={i._id}>
							<div className={cls.image}>
								<Image
									src={`${API.host}${i.image}`}
									layout="fill"
									objectFit="contain"
									alt={i.title?.[lang as string]}
								/>
							</div>
							<p>
								{i.title?.[lang as string]}
							</p>
						</li>
					))}
				</ul>
			</div>
			<div className={cn(clsParent.decor, cls.decor2)}>
				<img src={reg4.src} alt=""/>
				<img src={reg1.src} alt=""/>
			</div>
		</section>
	);
};
