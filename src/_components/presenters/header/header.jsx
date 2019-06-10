// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
// Style Imports
import Style from './header.module.scss';
import profile from '../../../_images/default_profile.png';
import logo from '../../../_images/beverage.svg';
import { OptionTypes } from '../../../_helpers/enums';


const Header = (props) => {
    if (props.platform == "DESKTOP") {
        return (
            <div className={Style.header}> 
                <img className={Style.logo} src={logo} />

                <div className={Style.headerRight}>
                    <h4>Welcome {props.displayName}</h4>
                    
                    <Link to={{pathname: "/account", state: {prevLocation: props.location.pathname}}} className={Style.accountOption}>
                        <img src={profile} />
                    </Link>
                </div>
            </div>
        )
    }
    else if (props.platform == "MOBILE") {
        return (
            <div id={Style.mobileHeader}>
                
                <div className={Style.logo}><img src={logo} alt="" /></div>
                <div className={Style.profilePicture}><img src={profile} alt="" /></div>

            </div>
        )
    }
    else {
        throw new Error("Unrecognised platform for component Header")
    }
}
    
const mapStateToProps = (state) => {
    return ({
        platform: state.app.platform,
        backOption: state.app.backOption,
        displayName: state.user.displayName
    })
}

export default withRouter(connect(mapStateToProps)(Header))


/*
<div className={Style.mobileHeader}>
    {
        (props.backOption.optionType === OptionTypes.logOut) &&
        <Link to={props.backOption.optionLocation} className={Style.headerbuttonSignOut} >
            <i className="fa fa-sign-out-alt"></i>
        </Link>
    }
    {
        (props.backOption.optionType === OptionTypes.back) &&
        <Link to={props.backOption.optionLocation} className={Style.headerButton}>
            <i className="fa fa-arrow-left"></i>
        </Link>
    }
    <Link to={{pathname: "/account", state: {prevLocation: props.location.pathname}}} className={Style.headerButton}>
        <i className="fa fa-user-cog"></i>
    </Link>
    <a className={Style.headerButton}><i className="fa fa-question"></i></a>
    <img className={Style.logo} src={logo} />
</div>
*/