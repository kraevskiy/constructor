import cls from './Advantages.module.scss';
import clsParent from '../../Home.module.scss';
import { AdvantagesProps } from './Advantages.props';
import cn from 'classnames';
import { BlockHead, FadeInWhenVisible } from '../../../../components';

const colors: string[] = [
	'var(--c-blue)',
	'var(--c-yellow)',
	'var(--c-green)',
	'var(--c-violet)'
];

const generateRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
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
								style={{
									borderLeftColor: colors[generateRandomNumber(0, colors.length - 1)]
								}}
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
