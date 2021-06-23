import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { ICreatePageFormInterface } from './CreatePageForm.interface';
import axios from 'axios';


const GetFields = memo(({
	fields,
	nameKey,
	count
}: {
	nameKey: string;
	fields: string[];
	count: number[]
}): JSX.Element => {
	const {register} = useFormContext();

	if (!count.length) {
		return <p>added {nameKey} please</p>;
	}

	return (
		<>
			{count.map(s => (
				<div className="row" key={Math.random() + s}>
					<div className="col-12">
						<small>{nameKey}-{s}</small>
					</div>
					{fields.map(field => (
						<div className="col-3" key={`${nameKey}.${s}.${field}`}>
							<label className="form-label w-100">
								{`${nameKey}.${s}.${field}`}
								<input
									{...register(`${nameKey}.${s}.${field}`)}
									type="text"
									className="form-control"/>
							</label>
						</div>
					))}
				</div>
			))}
		</>
	);
});


export const CreatePageForm = ({defaultData}:{defaultData: ICreatePageFormInterface}): JSX.Element => {
	const formMethods = useForm<ICreatePageFormInterface>({
		defaultValues: defaultData
	});

	const [sliders, setSliders] = useState<number[]>(()=>{
		const a: number[] = [];
		defaultData.slides?.map((_, idx)=>a.push(idx));
		return a;
	});
	const [SouvenirsPage, setSouvenirsPage] = useState<number[]>(()=>{
		const a: number[] = [];
		defaultData.souvenirs?.items.map((_, idx)=>a.push(idx));
		return a;
	});
	const [PicturesPageItems, setPicturesPageItems] = useState<number[]>(()=>{
		const a: number[] = [];
		defaultData.pictures?.items.map((_, idx)=>a.push(idx));
		return a;
	});
	const [AdvantagesPageItems, setAdvantagesPageItems] = useState<number[]>(()=>{
		const a: number[] = [];
		defaultData.advantages?.items.map((_, idx)=>a.push(idx));
		return a;
	});
	const [ContactsPageItems, setContactsPageItems] = useState<number[]>(()=>{
		const a: number[] = [];
		defaultData.contacts?.items.map((_, idx)=>a.push(idx));
		return a;
	});
	const [FaqItemsPage, setFaqItemsPage] = useState<number[]>(()=>{
		const a: number[] = [];
		defaultData.faqs?.items.map((_, idx)=>a.push(idx));
		return a;
	});

	const handleSubmitForm = async (data: ICreatePageFormInterface) => {
		console.log(data);
		const token = localStorage.getItem('auth-token');
		const page = await axios.post(`${process.env.REACT_APP_PAGE_CREATE}`, data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		console.log(page);
	};

	const pushCount = (name: number[], setName: Dispatch<SetStateAction<number[]>>) => {
		setName(prevState => [
			...prevState, name.length
		]);
	};

	return (
		<form className="col-12 m-auto pb-5" onSubmit={formMethods.handleSubmit(handleSubmitForm)}>
				<FormProvider {...formMethods}>
					<div className="card p-2 mb-3 shadow">
						<div className="row">
							<div className="mb-3 col-12">
								<label htmlFor="exampleFormControlInput1" className="form-label w-100"><h5
									className="text-center w-100">slag</h5></label>
								<input
									{...formMethods.register('slag')}
									type="text"
									className="form-control"/>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								SEO
							</h5>
							<div className="col-4">
								<label className="form-label w-100">
									seo.seoTitle
									<input
										{...formMethods.register('seo.seoTitle')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-4">
								<label className="form-label w-100">
									seo.seoDescription
									<input
										{...formMethods.register('seo.seoDescription')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-4">
								<label className="form-label w-100">
									seo.additional
									<input
										{...formMethods.register('seo.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								header
							</h5>
							<div className="col-4">
								<label className="form-label w-100">
									header.seoTitle
									<input
										{...formMethods.register('header.seoTitle')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-4">
								<label className="form-label w-100">
									header.seoDescription
									<input
										{...formMethods.register('header.seoDescription')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-4">
								<label className="form-label w-100">
									header.additional
									<input
										{...formMethods.register('header.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								slides
							</h5>
							<div className="col-12">
								<GetFields nameKey="slides" fields={['image', 'title', 'text', 'additional']} count={sliders}/>
							</div>
							<div className="col-3">
								<button type="button" className="btn btn-primary" onClick={() => pushCount(sliders, setSliders)}>add
									Slide
								</button>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								souvenirs
							</h5>
							<div className="col-6">
								<label className="form-label w-100">
									souvenirs.title
									<input
										{...formMethods.register('souvenirs.title')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-6">
								<label className="form-label w-100">
									souvenirs.additional
									<input
										{...formMethods.register('souvenirs.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>

							<div className="col-12">
								<label className="form-label w-100">
									souvenirs.items
									<GetFields nameKey="souvenirs.items" fields={['image', 'title']} count={SouvenirsPage}/>
								</label>
							</div>
							<div className="col-3">
								<button type="button" className="btn btn-primary"
												onClick={() => pushCount(SouvenirsPage, setSouvenirsPage)}>add
									souvenirs.item
								</button>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								pictures
							</h5>
							<div className="col-6">
								<label className="form-label w-100">
									pictures.title
									<input
										{...formMethods.register('pictures.title')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-6">
								<label className="form-label w-100">
									pictures.additional
									<input
										{...formMethods.register('pictures.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>

							<div className="col-12">
								<label className="form-label w-100">
									pictures.items
									<GetFields nameKey="pictures.items" fields={['image', 'title']} count={PicturesPageItems}/>
								</label>
							</div>
							<div className="col-3">
								<button type="button" className="btn btn-primary"
												onClick={() => pushCount(PicturesPageItems, setPicturesPageItems)}>add
									pictures.item
								</button>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								advantages
							</h5>
							<div className="col-6">
								<label className="form-label w-100">
									advantages.title
									<input
										{...formMethods.register('advantages.title')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-6">
								<label className="form-label w-100">
									advantages.additional
									<input
										{...formMethods.register('advantages.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>

							<div className="col-12">
								<label className="form-label w-100">
									advantages.items
									<GetFields nameKey="advantages.items" fields={['text', 'title', 'icon']} count={AdvantagesPageItems}/>
								</label>
							</div>
							<div className="col-3">
								<button type="button" className="btn btn-primary"
												onClick={() => pushCount(AdvantagesPageItems, setAdvantagesPageItems)}>add
									advantages.item
								</button>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								contacts
							</h5>
							<div className="col-6">
								<label className="form-label w-100">
									contacts.title
									<input
										{...formMethods.register('contacts.title')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-6">
								<label className="form-label w-100">
									contacts.additional
									<input
										{...formMethods.register('contacts.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>

							<div className="col-12">
								<label className="form-label w-100">
									contacts.items
									<GetFields nameKey="contacts.items" fields={['name', 'icon', 'link', 'showLink']} count={ContactsPageItems}/>
								</label>
							</div>
							<div className="col-3">
								<button type="button" className="btn btn-primary"
												onClick={() => pushCount(ContactsPageItems, setContactsPageItems)}>add
									contacts.item
								</button>
							</div>
						</div>
					</div>
					<div className="card p-2 mb-3 shadow">
						<div className="row mb-3">
							<h5 className="col-12 text-center">
								faqs
							</h5>
							<div className="col-6">
								<label className="form-label w-100">
									faqs.title
									<input
										{...formMethods.register('faqs.title')}
										type="text"
										className="form-control"/>
								</label>
							</div>
							<div className="col-6">
								<label className="form-label w-100">
									faqs.additional
									<input
										{...formMethods.register('faqs.additional')}
										type="text"
										className="form-control"/>
								</label>
							</div>

							<div className="col-12">
								<label className="form-label w-100">
									faqs.items
									<GetFields nameKey="faqs.items" fields={['title', 'text']} count={FaqItemsPage}/>
								</label>
							</div>
							<div className="col-3">
								<button type="button" className="btn btn-primary"
												onClick={() => pushCount(FaqItemsPage, setFaqItemsPage)}>add
									faqs.item
								</button>
							</div>
						</div>
					</div>
					<button className="btn btn-primary">Save</button>
				</FormProvider>
		</form>
	);
};
