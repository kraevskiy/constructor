import cls from './Intro.module.scss';
import clsParent from '../../Home.module.scss';
import { IntroProps } from './Intro.props';
import cn from 'classnames';
import { mug, picture, regsl, vizitka } from '../../../../images';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { SliderPage } from '../../../../types/page';
import { useEffect } from 'react';


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
					<img src={'http://localhost:3001' + slideData.image} alt=""/>
				</div>
			</div>
		);
	};
	console.log(data);
	return (
		<section className={cn(clsParent.intro, cls.warpper)}>
			<img src={regsl} alt="" className={cls.img}/>
			<div className={cn('container')}>
				<Carousel
					showThumbs={false}
					showArrows={false}
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
