import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ICreatePageFormInterface } from './CreatePageForm.interface';
import { Input, Textarea } from '../';
import { CreatePageFormTypes } from './CreatePageForm.types';
import { SettingPageContext } from '../../pages/Setting/SettingPage';
import cls from './CreatePageForm.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { getLanguageField } from './getLanguageField';
import { GetFields } from './GetFields/GetFields';
import { useDispatch } from 'react-redux';
import { editPageById } from '../../redux/page/pageAction';

const CreatePageForm = ({defaultData}: CreatePageFormTypes): JSX.Element => {
	const dispatch = useDispatch();
	const {t} = useTranslation('setting');
	const {langField} = useContext(SettingPageContext);
	const formMethods = useForm<ICreatePageFormInterface>({
		defaultValues: defaultData ? defaultData : {}
	});

	const [sliders, setSliders] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.slides?.map((_, idx) => a.push(idx));
		return a;
	});
	const [SouvenirsPage, setSouvenirsPage] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.souvenirs?.items.map((_, idx) => a.push(idx));
		return a;
	});
	const [PicturesPageItems, setPicturesPageItems] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.pictures?.items.map((_, idx) => a.push(idx));
		return a;
	});
	const [OthersPageItems, setOthersPageItems] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.others?.items.map((_, idx) => a.push(idx));
		return a;
	});
	const [AdvantagesPageItems, setAdvantagesPageItems] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.advantages?.items.map((_, idx) => a.push(idx));
		return a;
	});
	const [ContactsPageItems, setContactsPageItems] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.contacts?.items.map((_, idx) => a.push(idx));
		return a;
	});
	const [FaqItemsPage, setFaqItemsPage] = useState<number[]>(() => {
		const a: number[] = [];
		defaultData?.faqs?.items.map((_, idx) => a.push(idx));
		return a;
	});

	const onSubmit = async (data: ICreatePageFormInterface) => {
		dispatch(editPageById(defaultData._id, data));
	};

	const pushCount = (name: number[], setName: Dispatch<SetStateAction<number[]>>) => {
		setName(prevState => [
			...prevState, name.length
		]);
	};

	return (
		<form onSubmit={formMethods.handleSubmit(onSubmit)}>
			<FormProvider {...formMethods}>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('slag')}
						</div>
						<Input
							{...formMethods.register('slag')}
						/>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('seo')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cn(cls.label)}>
								{t('seo.seoTitle')}
								<Input
									{...formMethods.register(getLanguageField('seo.seoTitle', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('seo.additional')}
								<Input
									{...formMethods.register('seo.additional')}
								/>
							</label>
							<label className={cn(cls.label, cls.w13)}>
								{t('seo.seoDescription')}
								<Textarea
									{...formMethods.register(getLanguageField('seo.seoDescription', langField))}
								/>
							</label>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('header')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('header.seoTitle')}
								<Input
									{...formMethods.register(getLanguageField('header.seoTitle', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('header.additional')}
								<Input
									{...formMethods.register('header.additional')}
								/>
							</label>
							<label className={cn(cls.label, cls.w13)}>
								{t('header.seoDescription')}
								<Textarea
									{...formMethods.register(getLanguageField('header.seoDescription', langField))}
								/>
							</label>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('slides')}
						</div>
						<GetFields
							formMethods={formMethods}
							nameKey="slides"
							fields={['image', 'title', 'text', 'additional']}
							count={sliders}/>
						<div>
							<button
								type="button"
								className="btn"
								onClick={() => pushCount(sliders, setSliders)}>
								{t('slides.add')}
							</button>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('souvenirs')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('souvenirs.title')}
								<Input
									{...formMethods.register(getLanguageField('souvenirs.title', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('souvenirs.additional')}
								<Input
									{...formMethods.register('souvenirs.additional')}
								/>
							</label>
							<div className={cn(cls.full, cls.col13)}>
								<div className={cls.label}>
									<span className={cls.labelTitle}>{t('souvenirs.items')}</span>
									<GetFields
										formMethods={formMethods}
										nameKey="souvenirs.items"
										fields={['image', 'title']}
										count={SouvenirsPage}/>
								</div>
								<div>
									<button
										type="button"
										className="btn"
										onClick={() => pushCount(SouvenirsPage, setSouvenirsPage)}>
										{t('souvenirs.add')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('pictures')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('pictures.title')}
								<Input
									{...formMethods.register(getLanguageField('pictures.title', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('pictures.additional')}
								<Input
									{...formMethods.register('pictures.additional')}
								/>
							</label>
							<div className={cn(cls.full, cls.col13)}>
								<div className={cls.label}>
									<span className={cls.labelTitle}>{t('pictures.items')}</span>
									<GetFields
										formMethods={formMethods}
										nameKey="pictures.items"
										fields={['image', 'title']}
										count={PicturesPageItems}/>
								</div>
								<div>
									<button
										type="button"
										className="btn"
										onClick={() => pushCount(PicturesPageItems, setPicturesPageItems)}>
										{t('pictures.add')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('others')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('others.title')}
								<Input
									{...formMethods.register(getLanguageField('others.title', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('others.additional')}
								<Input
									{...formMethods.register('others.additional')}
								/>
							</label>
							<div className={cn(cls.full, cls.col13)}>
								<div className={cls.label}>
									<span className={cls.labelTitle}>{t('others.items')}</span>
									<GetFields
										formMethods={formMethods}
										nameKey="others.items"
										fields={['image', 'title']}
										count={OthersPageItems}/>
								</div>
								<div>
									<button
										type="button"
										className="btn"
										onClick={() => pushCount(OthersPageItems, setOthersPageItems)}>
										{t('others.add')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('advantages')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('advantages.title')}
								<Input
									{...formMethods.register(getLanguageField('advantages.title', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('advantages.additional')}
								<Input
									{...formMethods.register('advantages.additional')}
								/>
							</label>
							<div className={cn(cls.full, cls.w13)}>
								<div className={cls.label}>
									<span className={cls.labelTitle}>{t('advantages.items')}</span>
									<GetFields
										formMethods={formMethods}
										nameKey="advantages.items"
										fields={['text', 'title', 'icon']}
										count={AdvantagesPageItems}/>
								</div>
								<div>
									<button
										type="button"
										className="btn"
										onClick={() => pushCount(AdvantagesPageItems, setAdvantagesPageItems)}>
										{t('advantages.add')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('contacts')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('contacts.title')}
								<Input
									{...formMethods.register(getLanguageField('contacts.title', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('contacts.additional')}
								<Input
									{...formMethods.register('contacts.additional')}
								/>
							</label>
							<div className={cn(cls.full, cls.w13)}>
								<div className={cls.label}>
									<span className={cls.labelTitle}>{t('contacts.items')}</span>
									<GetFields
										formMethods={formMethods}
										nameKey="contacts.items"
										fields={['name', 'icon', 'link', 'showLink']}
										count={ContactsPageItems}/>
								</div>
								<div>
									<button
										type="button"
										className="btn"
										onClick={() => pushCount(ContactsPageItems, setContactsPageItems)}>
										{t('contacts.add')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={cls.field}>
					<div className={cls.full}>
						<div className={cls.title}>
							{t('faqs')}
						</div>
						<div className={cn(cls.full, cls.col2)}>
							<label className={cls.label}>
								{t('faqs.title')}
								<Input
									{...formMethods.register(getLanguageField('faqs.title', langField))}
								/>
							</label>
							<label className={cls.label}>
								{t('faqs.additional')}
								<Input
									{...formMethods.register('faqs.additional')}
								/>
							</label>
							<div className={cn(cls.full, cls.w13)}>
								<div className={cls.label}>
									<span className={cls.labelTitle}>{t('faqs.items')}</span>
									<GetFields
										formMethods={formMethods}
										nameKey="faqs.items"
										fields={['title', 'text']}
										count={FaqItemsPage}/>
								</div>
								<div>
									<button
										type="button"
										className="btn"
										onClick={() => pushCount(FaqItemsPage, setFaqItemsPage)}>
										{t('faqs.add')}
									</button>
								</div>
							</div>
						</div>

					</div>
				</div>
				<button className="btn">{t('btn.save')}</button>
			</FormProvider>
		</form>
	);
};

export default CreatePageForm;
