import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const navbar = (props) => (
    <header>
        <nav className="Navbar">
            <ul>
                <li><NavLink
                    to="/"
                    exact
                    activeClassName="active" >Strona główna</NavLink> </li>
                <li><NavLink to={{
                    pathname: '/logowanie',
                }}>Logowanie</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default navbar;