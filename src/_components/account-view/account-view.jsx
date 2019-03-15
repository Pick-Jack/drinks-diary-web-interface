// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../_redux/actions/nav-options.actions.js';
// Style Imports
import Style from './account-view.module.scss';


class AccountView extends React.Component {
    constructor(props) {
        super(props)

        // Set the sidebar navigation options for the page
        this.props.setNavOptions([
            (<a onClick={this.props.history.goBack}><i className="fa fa-arrow-left"></i> Back</a>)
        ])
    }

    componentDidMount() {
        // TODO: Get account details from API
    }

    render() {
        return(
            <div id={Style.accountView}>
                <div className={Style.overview}>
                    <img />
                    
                    <div className={Style.info}>
                        <h3>Jack Pickett</h3>
                        <h3>Male - 21 (Born: 10/05/1997)</h3>
                    </div>
                    
                </div>

                <div className={Style.account}>
                    <div className={Style.details}>
                        <h3>Account Details</h3>
                        <div className={Style.divider}></div>

                        <div className={Style.infoRow}>    
                            <label>E-mail:</label>
                            <p>jgrp1997@hotmail.co.uk</p>
                        </div>

                        <div className={Style.infoRow}>    
                            <label>Password:</label>
                            <p>************</p>
                        </div>

                    </div>

                    <div className={Style.settings}>
                        <h3>Account Settings</h3>
                        <div className={Style.divider}></div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(AccountView))