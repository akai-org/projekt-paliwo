import React from 'react';

import classes from './Refill.css';

const refill = (props) => {

    return (
        <div className={classes.Refill}>
            <p>Cena: <strong>{props.cena}</strong></p>
            <p>Data: {props.data}</p>
            <p>Ilość: {props.ilosc}</p>
        </div>
    );

};

export default refill;