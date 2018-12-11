import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Logowanie from './containers/Logowanie/Logowanie';
import Rejestracja from './containers/Rejestracja/Rejestracja';
import Dodawanie from './containers/Dodawanie/Dodawanie';
import Paliwo from './containers/Paliwo/Paliwo';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Layout>
                <Switch>
                    <Route path="/logowanie" component={Logowanie} />
                    <Route path="/rejestracja" component={Rejestracja} />
                    <Route path="/dodawanie-tankowania" component={Dodawanie} />
                    <Route path="/" exact component={Paliwo} />
                </Switch>
            </Layout>
        </div>
    );
  }
}

export default App;