import React, { Component } from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Navigation/Footer/Footer';

import Auxi from '../Auxi/Auxi';
import classes from './Layout.css';

class Layout extends Component {

    render () {
        return (
            <Auxi>
                <Navbar/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Footer/>
            </Auxi>
        )
    }

}

export default Layout;