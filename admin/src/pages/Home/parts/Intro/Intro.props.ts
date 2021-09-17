import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SliderPage } from '../../../../types/page';

export interface IntroProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: SliderPage[];
}
