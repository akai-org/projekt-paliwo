import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from "../../axios-refills";
import User from './User/User';

class MainPage extends Component {

    state = {
        users: []
    };

    componentDidMount() {
        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo="' + localStorage.getItem('userId') + '"';
        axios.get('/uzytkownicy.json' + queryParams)
            .then(res => {
                console.log(res);
                const fetchedUsers = [];
                for (let key in res.data) {
                    fetchedUsers.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({users: fetchedUsers});
            })
            .catch(err => {
                console.log(err)
            })
    }

    render () {

        let user = this.state.users.map(user => (

            <User
                id={this.props.userId}
                name={user.userData.name}
                surname={user.userData.surname}
                key={user.id}/>
        ));

        return (
            <div>
                <p>Strona główna</p>
                { this.props.isAuthentitacted ? user : null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        isAuthentitacted: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(MainPage);