import {RouteProps} from "react-router-dom";
import React from "react";

export interface RoutesProps extends Omit<RouteProps, "component"> {
	component: React.FC<RouteProps>
}
