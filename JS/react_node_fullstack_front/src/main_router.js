import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "./core/home";
import Menu from "./core/menu";
import Signup from "./user/signup";
import Signin from "./user/signin";
import Profile from "./user/profile";
import Users from "./user/user";
import EditProfile from "./user/edit_profile";
import FindPeople from "./user/find_people";
import PrivateRoute from "./auth/private_route";
import NewPost from "./post/new_post";
import SinglePost from "./post/single_post";
import EditPost from "./post/edit_post";

const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
			<Route exact path="/" component={Home} />
			<PrivateRoute exact 
			path="/post/create" 
			component={NewPost} 
			/>
			<Route exact path="/post/:postId" component={SinglePost} />
			<Route exact path="/users" component={Users} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/signin" component={Signin} />
			<PrivateRoute exact 
			path="/findpeople" 
			component={FindPeople} />
			<PrivateRoute exact 
			path="/user/edit/:userId" 
			component={EditProfile} 
			/>
			<PrivateRoute exact 
			path="/user/:userId" 
			component={Profile} 
			/>
			<PrivateRoute exact 
			path="/post/edit/:postId" 
			component={EditPost} 
			/>
			<Route path="*" component={() => <h1>Acesso Negado!</h1>} />
		</Switch>
	</div>
);

export default MainRouter;
