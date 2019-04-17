// React imports
import React from 'react';
// Router imports
import { Redirect } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { clearErrorState } from '../../_redux/actions/app.actions'
// Style imports
import Style from './error-view.module.scss'


class ErrorView extends React.Component {
    constructor(props) {
        super(props);

        this.errorTypes = {
            403: {
                code: 403,
                title: "Permission Denied",
                message: "You do not have permission to view this content. If you believe this to be a mistake, please contact an administrator."
            },
            404: {
                code: 404,
                title: "Not Found",
                message: "The content you have requested does not exist."
            },
            500: {
                code: 500,
                title: "Server Error",
                message: "An unexpected error has been encountered. We will attempt to fix this is as soon as possible. Please try again later."
            }
        }
    }
    
    componentWillUnmount() {
        // Reset the redux app error state
        this.props.clearErrorState()
    }

    render() {
        if (this.props.errorState !== undefined) {
            if (this.props.platform === "DESKTOP") {
                return (
                    <div id={Style.desktopErrorPage}>
                        <div className={Style.container}>
                        
                            <div className={Style.title}>
                                <h2>{this.props.errorState.code}</h2>
                                <h4>- {this.errorTypes[this.props.errorState.code].title}</h4>
                            </div>
                            
                            <div className={Style.message}>
                                <p>{this.errorTypes[this.props.errorState.code].message}</p>
                            </div>
                        
                        </div>
                    </div>    
                );
            }
            else if (this.props.platform === "MOBILE") {
                return (
                    <div className={Style.mobileErrorPage}>
                    
                    </div>
                )
            }
        } 
        return (
            <Redirect from={this.props.match.url} to="/" />
        )
    }
}


const mapStateToProps = (state) => ({
    platform: state.app.platform,
    errorState: state.app.errorState
})

const mapDispatchToProps = (dispatch) => {
    return {
        clearErrorState: () => {
            dispatch(clearErrorState())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorView)