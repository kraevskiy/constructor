import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StatePage } from '../../redux/redux.types';

export interface CreatePageFormTypes extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
	defaultData: StatePage
}
