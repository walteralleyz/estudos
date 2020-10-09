import React from 'react';
import {BrowserRouter} from "react-router-dom";

import MainRouter from "./main_router";

const App = () => (
	<BrowserRouter>
		<MainRouter />
	</BrowserRouter>
);

export default App;
