import cls from './Pictures.module.scss';
import clsParent from '../../Home.module.scss';
import { PicturesProps } from './Pictures.props';
import cn from 'classnames';
import { BlockHead } from '../../../../components';

export const Pictures = ({data, lang}: PicturesProps): JSX.Element => {
	return (
		<section className={cn(clsParent.title, cls.warpper)}>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title[lang]}
				</BlockHead>
				<ul className={cls.list}>
					{data.items.map(i => (
						<li key={i._id}>
							<img src={i.image} alt={i.title?.[lang]}/>
							<p>
								{i.title[lang]}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
