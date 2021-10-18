import { lazy } from 'react';

export const ConstructorPage = lazy(() => import('./Constructor/ConstructorPage'));
export const LayoutsPage = lazy(() => import('./Layouts/LayoutsPage'));
export const LayoutsAllPage = lazy(() => import('./LayoutsAll/LayoutsAllPage'));
export const LoginPage = lazy(() => import('./Login/LoginPage'));
export const OrdersPage = lazy(() => import('./Order/OrderPage'));
export const OrderAllPage = lazy(() => import('./OrderAll/OrderAllPage'));
export const SettingPage = lazy(() => import('./Setting/SettingPage'));
export const ProfilePage = lazy(() => import('./Profile/ProfilePage'));
export const RegistrationPage = lazy(() => import('./Registration/RegistrationPage'));
export const NotFound = lazy(() => import('./NotFound/NotFound'));
export const Home = lazy(() => import('./Home/Home'));

