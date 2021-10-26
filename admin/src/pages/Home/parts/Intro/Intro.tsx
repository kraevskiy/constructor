import cls from './Intro.module.scss';
import clsParent from '../../Home.module.scss';
import { IntroProps } from './Intro.props';
import cn from 'classnames';
import { regsl } from '../../../../images';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { SliderPage } from '../../../../types/page';
import { arrow_full } from '../../../../images/icons';


export const Intro = ({data, lang}: IntroProps): JSX.Element => {
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
					<img src={slideData.image} alt={slideData.title?.[lang]}/>
				</div>
			</div>
		);
	};
	return (
		<section className={cn(clsParent.intro, cls.wrapper)}>
			<img src={regsl} alt="" className={cls.img}/>
			<div className={cn('container')}>
				<Carousel
					showThumbs={false}
					// showArrows={false}
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
									src={arrow_full} />
							</button>
						)}
					renderArrowNext={(clickHandler, hasNext, labelNext) =>
						(
							<button
								aria-label={labelNext}
								onClick={clickHandler}
								className={cn(cls.arrow, cls.arrowNext, {
									[cls.fade]: !hasNext
								})}
							>
								<img
									alt="slide next"
									src={arrow_full} />
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
