// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions.js';
// Style Imports
import Style from './account-view.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import { UnexpectedPlatformError } from '../../_helpers/errors/index.js';


class AccountView extends React.Component {
    constructor(props) {
        super(props)

        // Set back location
        this.props.setBackOption(this.props.location.state.prevLocation)
        // Set nav options
        this.props.setNavOptions([])
    }

    componentDidMount() {
        // TODO: Get account details from API
    }

    render() {
        if (this.props.platform === "DESKTOP") {
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
        else if (this.props.platform === "MOBILE") {
            return (
                <div className={Style.mobileAccountView}>
                    <div className={Style.info}>
                        <img />
                        <div className={Style.info}>
                            <h4>Jack Pickett</h4>
                            <h7>Male - 21 (Born: 10/05/1997)</h7>
                        </div>
                    </div>

                    <div className={Style.details}>
                        <div className={Style.sectionTitle}>
                            <h4>Account Details</h4>
                            <Link to={`${this.props.match.url}/editDetails`} className={ButtonStyle.buttonXS}><i className="fa fa-pencil-alt"></i> Edit</Link>
                        </div>

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
                        <h4 className={Style.sectionTitle}>Account Details</h4>
                    </div>

                </div>
            )
        }
        else {
            throw new UnexpectedPlatformError(this.props.platform, this.constructor.name)
        }
    }
}

const mapStateToProps = (state) => ({
    platform: state.app.platform
})

const mapDispatchToProps = (dispatch) => {
    return {
        setBackOption: (location, type) => {
            dispatch(setBackOption(location, type))
        },
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountView))