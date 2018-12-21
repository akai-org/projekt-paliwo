import React from 'react';

const user = (props) => {
    return (
        <div>
            <p><strong>Twoje ID:</strong> {props.id}</p>
            <p><strong>Name:</strong> {props.name}</p>
            <p><strong>Surname:</strong> {props.surname}</p>
        </div>
    );
};

export default user;