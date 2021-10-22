import { GetFieldsProps } from './GetFields.props';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingPageContext } from '../../../pages/Setting/SettingPage';
import { useFormContext, Controller } from 'react-hook-form';
import cls from '../CreatePageForm.module.scss';
import { Input, InputFile, Textarea } from '../../';
import { getLanguageField } from '../getLanguageField';
import { ICreatePageFormInterface } from '../CreatePageForm.interface';
import cn from 'classnames';

export const GetFields = ({count, nameKey, fields, formMethods}: GetFieldsProps): JSX.Element => {
	const {t} = useTranslation('setting');
	const {langField} = useContext(SettingPageContext);
	const {register} = useFormContext();
	const {control} = formMethods;

	if (!count.length) {
		return <p>added {t(nameKey)} please</p>;
	}

	const langF: string[] = ['title', 'name'];
	const textF: string[] = ['text'];

	return (
		<div className={cls.wrapper}>
			{count.map(s => (
				<div
					className={cn(cls.full, cls.item)}
					key={Math.random() + s}>
					<div className={cls.sub}>
						<small>{nameKey} #{s + 1}</small>
					</div>
					{fields.map(field => (
						<label key={`${nameKey}.${s}.${field}`} className={cls.label}>
							{t(`${nameKey}.${field}`)}
							{
								langF.some(f => f === field)
									? <Input
										{...register(getLanguageField(`${nameKey}.${s}.${field}`, langField))}
									/>
									: field === 'image' || field === 'icon'
										? <Controller
											control={control}
											name={`${nameKey}.${s}.${field}` as keyof ICreatePageFormInterface}
											render={({field}) => {
												return <InputFile
													url={field.value as string}
													setValue={field.onChange}
													ref={field.ref}
												/>;
											}}
										/>
										: textF.some(tf => tf === field)
											? <Textarea
												{...formMethods.register(getLanguageField(`${nameKey}.${s}.${field}`, langField))}
											/>
											: <Input
												{...register(`${nameKey}.${s}.${field}`)}
											/>
							}
						</label>
					))}
				</div>
			))}
		</div>
	);
};
