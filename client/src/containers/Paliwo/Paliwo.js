import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './Paliwo.css';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Navigation/Footer/Footer';
import Logowanie from '../../components/Logowanie/Logowanie';

class Paliwo extends Component {
    render () {
        return (
            <div className={classes.Paliwo}>

                <Navbar/>

                <Route path="/logowanie" component={Logowanie} />

                <Footer/>

            </div>
        );
    }
}

export default Paliwo;