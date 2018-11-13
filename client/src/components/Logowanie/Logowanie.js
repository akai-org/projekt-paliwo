import React from 'react';

import './Logowanie.css';

const logowanie = (props) => (

    <div className="login-page">
        <div className="form">
            <form className="login-form">
                <input type="text" placeholder="e-mail"/>
                <input type="password" placeholder="hasło"/>
                <button>Zaloguj się</button>
            </form>
        </div>
    </div>

);

export default logowanie;