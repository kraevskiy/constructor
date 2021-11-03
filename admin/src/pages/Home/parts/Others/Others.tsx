import cls from './Others.module.scss';
import clsParent from '../../Home.module.scss';
import { OthersProps } from './Others.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../../../components';
import { NavLink } from 'react-router-dom';
import { paths } from '../../../../routes/paths';

export const Others = ({data, lang}: OthersProps): JSX.Element => {
	if (!data) return <></>;
	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
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
		</section>
	);
};
