import * as React from 'react';
import { NavLink } from 'react-router-dom';
//Nav FC renders a navbar at the top of the page that allows user to switch between 'Home' and 'Compose' page views
const Nav: React.FC<NavProps> = props => {
    return (
        <nav className="nav justify-content-center shadow p-3 mb-4 navi-color">
            <NavLink exact className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/">Home</NavLink>
            <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/compose">Compose</NavLink>
        </nav>
    );
}

interface NavProps {}
// Nav is exported
export default Nav;