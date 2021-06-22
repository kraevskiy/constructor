import {RouteProps} from "react-router-dom";
import React from "react";
import { RolesUser } from '../redux/redux.types';

export interface RoutesProps extends Omit<RouteProps, "component"> {
	component: React.FC<RouteProps>;
	role?: RolesUser;
	hideLoggedUser?: boolean;
}
