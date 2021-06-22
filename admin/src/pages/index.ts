import { lazy } from 'react';

export const ConstructorPage = lazy(() => import('./Constructor/ConstructorPage'));
export const LayoutsPage = lazy(() => import('./Layouts/LayoutsPage'));
export const LoginPage = lazy(() => import('./Login/LoginPage'));
export const OrdersPage = lazy(() => import('./Order/OrderPage'));
export const PagesPage = lazy(() => import('./Pages/PagesPage'));
export const ProfilePage = lazy(() => import('./Profile/ProfilePage'));

