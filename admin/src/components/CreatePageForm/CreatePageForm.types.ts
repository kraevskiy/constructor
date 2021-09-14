import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICreatePageFormInterface } from './CreatePageForm.interface';

export interface CreatePageFormTypes extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
	defaultData?: ICreatePageFormInterface
}
