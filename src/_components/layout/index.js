import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

//import Layout components
import LandingLayout from './landing-layout'
import ApplicationLayout from './application-layout'


const Layout = (props) => {
    if (props.isAuthorised) {
        return (<ApplicationLayout children={props.children} navOptions={props.navOptions} />)
    }
    else if (!props.isAuthorised) {
        return (<LandingLayout children={props.children} />)
    }
    else {
        throw new Error("Unexpected value for prop: isAuthorised.")
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
