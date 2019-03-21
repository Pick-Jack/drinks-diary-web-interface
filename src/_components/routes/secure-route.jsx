// React imports 
import React from 'react'
// Router imports
import { Route, withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { checkAuth } from '../../_redux/actions/user.actions'


const SecureRoute = (props) => (
    <Route exact={props.exact} path={props.path} render={(match) => {
        // Check user is authorised
        props.checkAuth(props.user.authToken)

        if (props.render) { return props.render(match) } 
        else { return (<props.component {...match}/>) }
    }} />
) 


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: (authToken) => {
            dispatch(checkAuth(authToken))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SecureRoute))