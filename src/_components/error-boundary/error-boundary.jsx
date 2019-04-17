// React imports
import React from 'react';
// Router imports
import { withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { setErrorState } from '../../_redux/actions/app.actions'


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate(prevProps) {
        // Change state for updated redux store error state
        if (this.props.errorState !== prevProps.errorState && this.props.errorState !== undefined) {
            this.props.history.push("/error")
        }
    }

    componentDidCatch(error, info) {
        // TODO : implement interface logging containg stack info
        // Set application error state
        this.props.setErrorState(error, 500)
        // Redirect user to error page
        this.props.history.push("/error")
    }
    
    render() {
        return this.props.children;
    }
}


const mapStateToProps = (state) => ({
    errorState: state.app.errorState
})

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorState: (error, code) => {
            dispatch(setErrorState(error, code))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary))