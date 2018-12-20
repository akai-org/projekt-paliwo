import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Navigation/Footer/Footer';

import Auxi from '../Auxi/Auxi';
import classes from './Layout.css';

class Layout extends Component {

    render () {
        return (
            <Auxi>
                <Navbar isAuthentitacted={this.props.isAuthentitacted} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Footer/>
            </Auxi>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthentitacted: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);