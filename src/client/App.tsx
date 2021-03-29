import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Details from './pages/Details';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
// App FC creates and outlines the front end routes
// Nav component above all routes creates a Navbar that remains at the top of the page
const App: React.FC<AppProps> = props => {
    return (
        <BrowserRouter>
		<Nav />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/compose'>
					<Compose />
				</Route>
				<Route exact path='/details/:blogid'>
					<Details />
				</Route>
				<Route exact path='/admin/:blogid'>
					<Admin />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Route exact path='/register'>
					<Register />
				</Route>
			</Switch>
		</BrowserRouter>
    );
}

interface AppProps {}
// App is exported
export default App;