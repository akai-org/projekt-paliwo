import React, { Component } from 'react';

import './Logowanie.css';

class Logowanie extends Component {
    render() {
        return (
            <div className="login-page">
                <div className="form">
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