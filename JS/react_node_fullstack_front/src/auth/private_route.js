// eslint-disable-next-line
import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index.js";

const PrivateRoute = ({component: Component, ...rest}) => (
	// props means components passed down to this private route comp
	<Route {...rest} render={props => isAuthenticated() ? (
		<Component {...props} />
	) : (
		<Redirect to={
		{pathname: "/signin", 
		state: {from: props.location}
		}} />
	)} />
);

export default PrivateRoute;