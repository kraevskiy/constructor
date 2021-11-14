import { useDispatch, useSelector } from 'react-redux';
import { Input, PageHead, InputLabel, Button, BlockHead } from '../../components/';
import { RootState } from '../../redux/rootReducer';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { paths } from '../../routes/paths';
import cls from './CreateOrderPage.module.scss';
import { useForm } from 'react-hook-form';
import { ICreateOrderFormInterface } from './CreateOrder.interface';
import { getCorrectValue, validate } from '../../helpers';
import Textarea from '../../components/Textarea/Textarea';
import { useEffect, useState } from 'react';
import { OrderType } from '../../types/order';
import { createOrders } from '../../redux/orders/ordersActions';
import { getLayouts } from '../../redux/layouts/layoutsActions';
import { INITIAL_PRICE } from '../../helpers/constants';

interface LocationState {
	layoutId?: string | undefined
}

const CreateOrderPage = (): JSX.Element => {
	const {state: stateLocation} = useLocation<LocationState>();
	const history = useHistory();
	if (!stateLocation?.layoutId) {
		history.push(paths.layouts);
	}

	const {layout, user} = useSelector((state: RootState) => {
		return {
			layout: state.layouts?.allLayouts.find(l => l._id === stateLocation.layoutId),
			user: state.user
		};
	});

	//// Remove after logic price
	const [price, setPrice] = useState<number>(INITIAL_PRICE);

	if (!layout) {
		history.push(paths.layouts);
		return <></>;
	}

	const {register, watch, handleSubmit, formState: {errors}} = useForm<ICreateOrderFormInterface>();

	const dispatch = useDispatch();
	const {t} = useTranslation();

	const handleSubmitForm = async (data: ICreateOrderFormInterface) => {
		const newData: OrderType = {
			...data,
			status: 'new',
			user: user._id,
			layouts: [
				{
					title: layout.title,
					_id: layout._id
				}
			]
		};
		await dispatch(createOrders(newData));
		await dispatch(getLayouts(user._id));
		history.push(paths.orders.index);
	};


	useEffect(() => {
		const subscription = watch((value, {name, type}) => {
			if (name === 'count' && type === 'change') {
				setPrice(getCorrectValue(INITIAL_PRICE, Number(value.count)));
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);


	return (
		<div className="container">
			<PageHead>{t('order.create')}</PageHead>
			<form className={cls.content} onSubmit={handleSubmit(handleSubmitForm)}>
				<div className={cls.body}>
					<div className={cls.title}>
						{t('order.payment')}
					</div>
					<div className={cls.box}>
						<InputLabel
							text={t('order.paymentType')}
							error={errors.paymentType}
							{...register('paymentType', {
								validate: value => validate.text(value)
							})}
							placeholder=""
						/>
					</div>
					<div className={cls.title}>
						{t('order.delivery')}
					</div>
					<div className={cls.box}>
						<InputLabel
							text={t('order.deliveryType')}
							error={errors.delivery}
							{...register('delivery', {
								validate: value => validate.text(value, 2)
							})}
							placeholder="new post"
						/>
					</div>
					<div className={cls.box}>
						<InputLabel
							text={t('user.address')}
							error={errors.address}
							{...register('address', {
								value: user.address,
								validate: value => validate.text(value, 1)
							})}
							placeholder="address"
						/>
					</div>
					<div className={cls.title}>
						{t('order.user')}
					</div>
					<div className={cls.boxHalfColumn}>
						<InputLabel
							text={t('user.firstName')}
							error={errors.firstName}
							{...register('firstName', {
								value: user.firstName,
								validate: value => validate.text(value)
							})}
							placeholder={t('user.firstName')}
						/>
						<InputLabel
							text={t('user.lastName')}
							error={errors.lastName}
							{...register('lastName', {
								value: user.lastName,
								validate: value => validate.text(value)
							})}
						/>
					</div>
					<div className={cls.box}>
						<InputLabel
							error={errors.phone}
							{...register('phone', {
								value: user.phone,
								validate: value => validate.phone(value)
							})}
							text={t('user.phone')}
							placeholder="0980999999"
						/>
					</div>
					<div className={cls.box}>
						<InputLabel
							error={errors.email}
							{...register('email', {
								value: user.email,
								validate: value => validate.email(value)
							})}
							text={t('login.email')}
							placeholder="name@example.com"
						/>
					</div>
					<div className={cls.box}>
						<Textarea
							error={errors.comment}
							{...register('comment', {
								required: false
							})}
							placeholder={t('order.comment')}
						/>
					</div>
					<div style={{textAlign: 'center'}}>
						<Button className={cls.button}>
							{t('order.btn')}
						</Button>
					</div>
				</div>
				<div className={cls.sidebar}>
					<BlockHead
						className={cls.t}
					>
						{t('order.order')}
					</BlockHead>
					<div className={cls.order}>
						<img
							className={cls.image}
							src={layout.preview}
							alt={layout.title}/>
						<div className={cls.orderInfo}>
							<p className={cls.orderTitle}>{layout.title}</p>
							<p className={cls.orderPrice}>
								<span>{t('order.price')}</span>
								<span>{INITIAL_PRICE}</span>
							</p>
							<p className={cls.orderCount}>
								<span>{t('order.count')}</span>
								<span>
									<Input
										error={errors.count}
										{...register('count', {
											required: true
										})}
										className={cls.input}
										placeholder="100"
									/>
								</span>
							</p>
						</div>
					</div>
					<div className={cls.price}>
						<span>{t('order.finish')}</span>
						<span>{price + ` $`}</span>
					</div>
					<div style={{textAlign: 'center'}}>
						<Button className={cls.buttonS}>
							{t('order.btn')}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateOrderPage;
