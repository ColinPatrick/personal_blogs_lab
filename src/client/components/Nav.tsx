import * as React from 'react';
import { NavLink } from 'react-router-dom';


//Nav FC renders a navbar at the top of the page that allows user to switch between 'Home' and 'Compose' page views
const Nav: React.FC<NavProps> = props => {

    return (
        <nav className="nav d-flex shadow p-3 mb-4 justify-content-between navi-color">
            <div className="float-left">
                <NavLink className="font-weight-light text-white mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/login">Login</NavLink>
            </div>
            <div className="">
                <NavLink exact className="font-weight-light text-white mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/">Blogs</NavLink>
                <NavLink className="font-weight-light text-white mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/compose">Compose</NavLink>
            </div>
        </nav>
    );
}

interface NavProps {}
// Nav is exported
export default Nav;