import cls from './Pictures.module.scss';
import clsParent from './../Home.module.scss';
import { PicturesProps } from './Pictures.props';
import cn from 'classnames';
import { BlockHead } from '../../';
import { API } from '../../../helpers/api';
import Image from 'next/image';

export const Pictures = ({data, lang}: PicturesProps): JSX.Element => {
	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title[lang as string]}
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
								{i.title[lang as string]}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
