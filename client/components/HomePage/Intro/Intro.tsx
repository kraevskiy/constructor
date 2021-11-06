import cls from './Intro.module.scss';
import clsParent from './../Home.module.scss';
import { IntroProps } from './Intro.props';
import cn from 'classnames';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Arrow_full } from '../../../public/static/images/icons';
import { SliderPage } from '../../../interfaces/HomePropsInterface';
import { API } from '../../../helpers/api';
import Image from 'next/image';
import { useState } from 'react';

const bgs: string[] = [
	"0% 50%",
	"60% 50%",
	"100% 50%",
	"0% 50%",
	"60% 50%",
	"100% 50%",
	"0% 50%",
	"60% 50%",
	"100% 50%",
];

export const Intro = ({data, lang}: IntroProps): JSX.Element => {
	const [bg, setBg] = useState(0);
	const Slide = (slideData: SliderPage) => {
		return (
			<div className={cls.slide}>
				<div className={cls.slideBody}>
					<div className={cls.slideBodyTitle}>
						{slideData.title?.[lang]}
					</div>
					<div className={cls.slideBodyText}>
						{slideData.text?.[lang]}
					</div>
				</div>
				<div className={cls.slideImg}>
					<Image
						src={`${API.host}${slideData.image}`}
						layout="fill"
						objectFit="contain"
						alt={slideData.title?.[lang]}
					/>
				</div>
			</div>
		);
	};
	return (
		<section className={cn(clsParent.intro, cls.wrapper)}>
			<div className={cls.img} style={{
				backgroundPosition: bgs[bg]
			}}/>
			<div className={cn('container')}>
				<Carousel
					showThumbs={false}
					// showArrows={false}
					onChange={(index)=>{
						setBg(index);
					}}
					renderIndicator={(
						clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
						isSelected: boolean,
						index: number,
						label: string
						) => (
						<li className={cls.indicator}>
							<button aria-label={label} className={`dot${isSelected ? ' selected' : ''}`} onClick={clickHandler}/>
						</li>
						)}

					renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
						(
							<button
								aria-label={labelPrev}
								onClick={clickHandler}
								className={cn(cls.arrow, cls.arrowPrev, {
									[cls.fade]: !hasPrev
								})}
							>
								<Arrow_full/>
							</button>
						)}
					renderArrowNext={(clickHandler, hasNext, labelPrev) =>
						(
							<button
								aria-label={labelPrev}
								onClick={clickHandler}
								className={cn(cls.arrow, cls.arrowNext, {
									[cls.fade]: !hasNext
								})}
							>
								<Arrow_full/>
							</button>
						)}
					emulateTouch={true}
					showStatus={false}
				>
					{
						data.map((slide, index) => <Slide key={Math.random() + index} {...slide} />)
					}
				</Carousel>
			</div>
		</section>
	);
};
