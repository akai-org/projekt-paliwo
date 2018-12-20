import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainPage extends Component {

    render () {

        return (
            <div>
                <p>Strona główna</p>
                <p><b>Twoje ID:</b> {this.props.userId}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
    }
};

export default connect(mapStateToProps)(MainPage);