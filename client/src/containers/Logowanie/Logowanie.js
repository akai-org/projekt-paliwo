import React, { Component } from 'react';

import classes from './Logowanie.css';

class Logowanie extends Component {
    render() {
        return (
            <div className={classes.Login_page} >
                <div className={classes.Form}>
                    <form className="login-form">
                        <input type="text" placeholder="e-mail"/>
                        <input type="password" placeholder="hasło"/>
                        <button>Zaloguj się</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Logowanie;