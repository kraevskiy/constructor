import cls from './Intro.module.scss';
import clsParent from './../Home.module.scss';
import { IntroProps } from './Intro.props';
import cn from 'classnames';
import { regsl } from '../../../public/static/images/';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { arrow_full } from '../../../public/static/images/icons';
import { SliderPage } from '../../../interfaces/HomePropsInterface';
import { API } from '../../../helpers/api';
import Image from 'next/image';


export const Intro = ({data, lang}: IntroProps): JSX.Element => {
	const Slide = (slideData: SliderPage) => {
		return (
			<div className={cls.slide}>
				<div className={cls.slideBody}>
					<div className={cls.slideBodyTitle}>
						{slideData.title?.[lang as string]}
					</div>
					<div className={cls.slideBodyText}>
						{slideData.text?.[lang as string]}
					</div>
				</div>
				<div className={cls.slideImg}>
					<Image
						src={`${API.host}${slideData.image}`}
						layout="fill"
						objectFit="contain"
						alt={slideData.title?.[lang as string]}
					/>
				</div>
			</div>
		);
	};
	return (
		<section className={cn(clsParent.intro, cls.wrapper)}>
			<img src={regsl.src} alt="" className={cls.img}/>
			<div className={cn('container')}>
				<Carousel
					showThumbs={false}
					// showArrows={false}
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
								<img
									alt="slide previous"
									width={arrow_full.width}
									height={arrow_full.height}
									src={arrow_full.src} />
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
								<img
									alt="slide next"
									width={arrow_full.width}
									height={arrow_full.height}
									src={arrow_full.src} />
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
