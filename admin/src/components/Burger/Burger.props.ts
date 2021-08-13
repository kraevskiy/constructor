import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface BurgerProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	active: boolean
}
