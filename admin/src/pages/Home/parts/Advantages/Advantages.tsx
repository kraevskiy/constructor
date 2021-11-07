import cls from './Advantages.module.scss';
import clsParent from '../../Home.module.scss';
import { AdvantagesProps } from './Advantages.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../../../components';
import { CSSProperties } from 'react';

const colors: CSSProperties[] = [
	{borderLeftColor: 'var(--c-blue)'},
	{borderLeftColor: 'var(--c-yellow)'},
	{borderLeftColor: 'var(--c-green)'},
	{borderLeftColor: 'var(--c-violet)'}
];

const generateRandomNumber = (min: number, max: number): CSSProperties =>  {
	return colors[Math.floor(Math.random() * (max - min) + min)];
};

export const Advantages = ({data, lang}: AdvantagesProps): JSX.Element => {
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
							<p
								style={generateRandomNumber(0, colors.length - 1)}
							>
								{i.title?.[lang]}
							</p>
						</FadeInWhenVisible>
					))}
				</ul>
			</div>
		</section>
	);
};
