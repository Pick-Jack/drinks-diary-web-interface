// React imports
import React from 'react'
// Router imports
import { withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
// Component imports
import MobilePageOptions from './_mobile'
import DesktopPageOptions from './_desktop'


const PageOptions = (props) => {
    if (props.platform === "DESKTOP") {
        return (<DesktopPageOptions />)
    }
    else if (props.platform === "MOBILE") {
        return (<MobilePageOptions />)
    }
}


const mapStateToProps = (state) => ({
    platform: state.app.platform
})

export default withRouter(connect(mapStateToProps)(PageOptions))