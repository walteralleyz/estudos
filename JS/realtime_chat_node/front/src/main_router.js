import React from "react";
import {Switch ,Route} from "react-router-dom";
import PrivateRoute from "./auth/private_route";

import Login from "./routes/login";
import Signup from "./routes/signup";
import Menu from "./routes/menu";
import ChatBox from "./routes/chatbox";

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />        
        <PrivateRoute exact path="/messages" component={ChatBox} />
        <PrivateRoute exact path="/menu/:userId" component={Menu} />
        <Route path="*" component={() => <strong>Desculpe, essa página não existe!</strong>} />
    </Switch>
);

export default MainRouter;