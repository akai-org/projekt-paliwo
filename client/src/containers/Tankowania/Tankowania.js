import React, { Component } from 'react';
import { connect } from 'react-redux';

import Refill from '../../components/Refill/Refill';
import classes from './Tankowania.css';

import * as actions from '../../store/actions/index';

class Tankowania extends Component {

    componentDidMount() {
        this.props.onFetchRefills(this.props.token, this.props.userId);
    }

    render () {
        let refills = null;
        if (!this.props.loading) {
            refills = this.props.refills.map(refill => (
                <Refill
                    cena={refill.refillData.cena}
                    data={refill.refillData.data}
                    ilosc={refill.refillData.ilosc}/>
            ));
        }

        return (
            <div className={classes.Tankowania}>
                {refills}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        refills: state.refill.refills,
        loading: state.refill.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRefills: (token, userId) => dispatch(actions.fetchRefills(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tankowania);