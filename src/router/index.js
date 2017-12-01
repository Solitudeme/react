import React from "react";
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import App from "../components/App";
import Card from "../components/Card";
import Film from "../components/Film";
import Home from "../components/Home";
import Nowplaying from "../components/Film/Nowplaying";
import Comingsoon from "../components/Film/Comingsoon";
import Detail from "../components/Detail";
import {Provider} from "react-redux";
import store from "../Redux/Store";

const router =(
	<Provider store={store}>
	<Router>
		<App>
			<Switch>
				<Route path="/home" component={Home}/>
				<Route path="/card" component={Card}/>
				<Route path="/film" render={()=>
					<Film>
						<Switch>
							<Route path="/film/nowplaying" component={Nowplaying} />
							<Route path="/film/comingsoon" component={Comingsoon} />
							<Redirect from="/film" to="/film/nowplaying" />
						</Switch>
					</Film>
				}/>
				<Route path="/detail/:solitudeid" component={Detail}/>
				<Redirect from="*" to="/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)

export default router;


