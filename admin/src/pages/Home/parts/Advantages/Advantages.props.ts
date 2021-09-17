import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { AdvantagesPage } from '../../../../types/page';

export interface AdvantagesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: AdvantagesPage;
}
