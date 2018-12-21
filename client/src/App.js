import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect  } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Autoryzacja from './containers/Autoryzacja/Autoryzacja';
import Rejestracja from './containers/Rejestracja/Rejestracja';
import Logout from './containers/Autoryzacja/Logout/Logout';
import Dodawanie from './containers/Dodawanie/Dodawanie';
import Tankowania from './containers/Tankowania/Tankowania';
import MainPage from './containers/MainPage/MainPage';

import * as actions from './store/actions/index';

class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/autoryzacja" component={Autoryzacja} />
                <Route path="/rejestracja" component={Rejestracja} />
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthentitacted) {
            routes = (
                <Switch>
                    <Route path="/wylogowanie" component={Logout} />
                    <Route path="/dodaj-tankowanie" component={Dodawanie} />
                    <Route path="/tankowania" component={Tankowania} />
                    <Route path="/" exact component={MainPage} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div className="App">
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthentitacted: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));