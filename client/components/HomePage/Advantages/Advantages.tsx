import cls from './Advantages.module.scss';
import clsParent from './../Home.module.scss';
import { AdvantagesProps } from './Advantages.props';
import cn from 'classnames';
import { BlockHead } from '../../';

const generateRandomNumber = (min: number, max: number): number =>  {
	return Math.floor(Math.random() * (max - min) + min);
};

export const Advantages = ({data, lang}: AdvantagesProps): JSX.Element => {
	const colors: string[] = [
		cls.cblue,
		cls.cyellow,
		cls.cgreen,
		cls.cviolet,
	];

	return (
		<section className={cn(clsParent.title, cls.wrapper)}>
			<div className="container">
				<BlockHead className={cls.title}>
					{data.title[lang as string]}
				</BlockHead>
				<ul className={cls.list}>
					{data.items.map(i => (
						<li key={i._id}>
							<p
								className={cn(colors[generateRandomNumber(0, colors.length - 1)])}
							>
								{i.title?.[lang as string]}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
