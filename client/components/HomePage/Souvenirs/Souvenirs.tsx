import cls from './Souvenirs.module.scss';
import clsParent from './../Home.module.scss';
import { SouvenirsProps } from './Souvenirs.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../';
import { Reg1, Reg2, Reg3, Reg4 } from '../../../public/static/images';
import { API } from '../../../helpers/api';
import Image from 'next/image';
import { paths } from '../../../helpers/paths';

export const Souvenirs = ({data, lang}: SouvenirsProps): JSX.Element => {
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className={cn(clsParent.decor, cls.decor1)}>
				<Reg3/>
				<Reg2/>
			</div>
			<div className="container">
				<FadeInWhenVisible>
					<BlockHead className={cls.title}>
						{data.title?.[lang]}
					</BlockHead>
				</FadeInWhenVisible>
				<ul className={cls.list}>
					{data.items.map(i => (
						<FadeInWhenVisible tag="li" key={i._id}>
							<a href={`${API.admin}${paths.constructor}`}>
								<div key={i._id} className={cls.image}>
									<Image
										src={`${API.host}${i.image}`}
										layout="fill"
										objectFit="contain"
										alt={i.title?.[lang]}
									/>
								</div>
								<p>
									{i.title?.[lang]}
								</p>
							</a>
						</FadeInWhenVisible>
					))}
				</ul>
			</div>
			<div className={cn(clsParent.decor, cls.decor2)}>
				<Reg4/>
				<Reg1/>
			</div>
		</section>
	);
};
