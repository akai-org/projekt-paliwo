import React, { Component } from 'react';
import { connect } from 'react-redux';

import Refill from '../../components/Refill/Refill';
import classes from './Paliwo.css';

import * as actions from '../../store/actions/index';

class Tankowania extends Component {

    componentDidMount() {
        this.props.onFetchRefills();
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
            <div className={classes.Paliwo}>
                {refills}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        refills: state.refill.refills,
        loading: state.refill.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRefills: () => dispatch(actions.fetchRefills())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tankowania);