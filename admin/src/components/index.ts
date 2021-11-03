import { lazy } from 'react';

const EditUserForm = lazy(() => import('./EditUserForm/EditUserForm'));
const LoginForm = lazy(()=>import('./LoginForm/LoginForm'));
const OrderList = lazy(()=>import('./OrderList/OrderList'));
const LayoutList = lazy(()=>import('./LayoutList/LayoutList'));
const RegistrationForm = lazy(()=>import('./RegistrationForm/RegistrationForm'));
const CreatePageForm = lazy(()=>import('./CreatePageForm/CreatePageForm'));
const LanguageSwitcher = lazy(()=>import('./LanguageSwitcher/LanguageSwitcher'));
const Burger = lazy(()=>import('./Burger/Burger'));
const PageHead = lazy(()=>import('./PageHead/PageHead'));
const BlockHead = lazy(()=>import('./BlockHead/BlockHead'));
const Button = lazy(()=>import('./Button/Button'));
const Input = lazy(()=>import('./Input/Input'));
const Textarea = lazy(()=>import('./Textarea/Textarea'));
const InputFile = lazy(()=>import('./InputFile/InputFile'));
const FadeInWhenVisible = lazy(()=>import('./FadeInWhenVisible/FadeInWhenVisible'));


export {
	FadeInWhenVisible,
	EditUserForm,
	LoginForm,
	OrderList,
	LayoutList,
	RegistrationForm,
	CreatePageForm,
	LanguageSwitcher,
	Burger,
	PageHead,
	BlockHead,
	Button,
	Input,
	Textarea,
	InputFile
};
