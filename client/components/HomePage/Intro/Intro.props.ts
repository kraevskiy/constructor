import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SliderPage } from '../../../interfaces/HomePropsInterface';

export interface IntroProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: SliderPage[];
	lang: string;
}
