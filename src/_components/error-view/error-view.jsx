// React imports
import React from 'react';
// Router imports
import { Link, Redirect } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { clearErrorState } from '../../_redux/actions/app.actions'
// Style imports
import Style from './error-view.module.scss'
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
// Image imports
import Logo from '../../_images/beverage.svg'


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
            return (
                <div id={Style.errorPage}>

                    <img className={Style.logo} src={Logo} />

                    <div className={Style.container}>
                        <div className={Style.title}>
                            <h2>{this.props.errorState.code}</h2>
                            <h4>- {this.errorTypes[this.props.errorState.code].title}</h4>
                        </div>
                        
                        <div className={Style.message}>
                            <p>{this.errorTypes[this.props.errorState.code].message}</p>
                        </div>
                    </div>

                    <div className={Style.options}>
                        <Link to={""} className={ButtonStyle.button}><i className="fa fa-arrow-left"></i>Back</Link>
                        <button className={ButtonStyle.buttonDanger}><i className="fa fa-bug"></i>Report Bug</button>
                    </div>
                </div>    
            );
        } else {
            return (<Redirect from={this.props.match.url} to="/" />)
        }
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