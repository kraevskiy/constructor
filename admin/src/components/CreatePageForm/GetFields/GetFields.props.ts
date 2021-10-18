import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ICreatePageFormInterface } from '../CreatePageForm.interface';

export interface GetFieldsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	nameKey: string;
	fields: string[];
	count: number[];
	formMethods:  UseFormReturn<ICreatePageFormInterface>;
}
