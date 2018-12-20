import React from 'react';

import classes from './Navbar.css';

import NavItem from './NavItem/Navtem';

const navbar = (props) => (
    <header>
        <nav className={classes.Navbar}>
            <ul>
                <NavItem link='/'>Strona główna</NavItem>
                { props.isAuthentitacted ? <NavItem link='/tankowania'>Tankowania</NavItem> : null }
                { props.isAuthentitacted ? <NavItem link='/dodaj-tankowanie'>Dodaj tankowanie</NavItem> : null }
                { props.isAuthentitacted
                    ? <NavItem link='/wylogowanie'>Wyloguj się</NavItem>
                    : <NavItem link='/autoryzacja'>Logowanie/Rejestracja</NavItem> }
            </ul>
        </nav>
    </header>
);

export default navbar;