import cls from './Others.module.scss';
import clsParent from './../Home.module.scss';
import { OthersProps } from './Others.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../';
import { API } from '../../../helpers/api';
import Image from 'next/image';
import { paths } from '../../../helpers/paths';

export const Others = ({data, lang}: OthersProps): JSX.Element => {
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
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
		</section>
	);
};
