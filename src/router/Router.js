import React, { Suspense, lazy } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect,
  useParams 
} from "react-router-dom";
import { history } from './History';
// import { useHistory } from "react-router-dom";

import PublicLayout from '../layouts/public-layout/PublicLayout';
import PrivateLayout from '../layouts/private-layout/PrivateLayout';
import PublicRoute from './../layouts/public-layout/PublicRoute';
import PrivateRoute from './../layouts/private-layout/PrivateRoute';
import LoaderDefault from "../components/loaderDefault";


const Login = lazy(() =>
  import("../pages/Auth/Login")
)

const Register = lazy(() =>
  import("../pages/Auth/Register")
)

const Locals = lazy(() =>
  import("../pages/Locals")
)

const LocalDetail = lazy (() =>
	import ("./../pages/Locals/LocalDetail")
)
const LocalCreate = lazy (() =>
	import ("./../pages/Locals/LocalCreate")
)


const AppRouter = () => {
	// const history = useHistory();

	return (
		<Router history={history}>
			<Switch>	
				<Redirect exact from="/" to="/login" />
				<Suspense 
					fallback={<LoaderDefault width="100" height="100" timeout={3000} heightWrap="100vh" />}>
					<Route exact path={["/login", "/register"]}>
						<PublicLayout>
							<Switch>
								{/* <Route path="/recover-password" component={RecoverPassword} /> */}
								<PublicRoute exact path="/login" component={Login}/>
								<PublicRoute exact path="/register" component={Register}/>
							</Switch>
						</PublicLayout>
					</Route>

					<Route exact path={["/admin/*", "/admin"]}>
						<PrivateLayout>
							<Switch>
								<Route
									exact
									path="/admin/locals"
									render={props => <PrivateRoute {...props} Component={Locals} />}
								/>
								<Route
									exact
									path="/admin/locals/create"
									render={props => <PrivateRoute {...props} Component={LocalCreate} />}
								/>
								<Route
									exact
									path="/admin/locals/detail/:id"
									render={props => <PrivateRoute {...props} Component={LocalDetail} />}
								/>
							</Switch>
						</PrivateLayout>
					</Route>

					{/* <Route path="/admin" render={ props => window.localStorage.getItem('token') ? 
						(
							<PrivateRoute {...props}>
								<Redirect  from="/admin" to="/admin/locals" />
								<Switch>
									<Route exact path="/admin/locals" component={Locals} />
									<Route exact path="/admin/locals/detail" component={LocalDetail} />
								</Switch>
							</PrivateRoute>
						) :
						(
							<Redirect to="/login" />
						)
					} /> */}
                </Suspense>
			</Switch>
		</Router>
  );
}

export default AppRouter