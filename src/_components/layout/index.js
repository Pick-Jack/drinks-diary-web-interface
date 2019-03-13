import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

//import Layout components
import { DesktopLandingLayout, MobileLandingLayout} from './landing-layout'
import { DesktopApplicationLayout, MobileApplicationLayout} from './application-layout'


const Layout = (props) => {
    if (!props.isAuthorised && props.platform === "DESKTOP") {
        return (<DesktopApplicationLayout children={props.children} navOptions={props.navOptions} />)
    }
    else if (props.isAuthorised && props.platform === "MOBILE") {
        return (<MobileApplicationLayout children={props.children} />)
    } 
    else if (!props.isAuthorised && props.platform === "DESKTOP") {
        return (<DesktopLandingLayout children={props.children} />)
    }
    else if (!props.isAuthorised && props.platform === "MOBILE") {
        return (<MobileLandingLayout children={props.children} />)
    }
}

const mapStateToProps = (state) => {
    return {
        platform: state.app.platform,
        isAuthorised: state.user.isAuthorised,
        navOptions: state.navOptions.options,
    }
}

export default withRouter(connect(mapStateToProps)(Layout))
