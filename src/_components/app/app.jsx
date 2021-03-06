// React dependencies
import React from 'react';
// Redux dependencies
import { connect } from 'react-redux';
import { logOut } from '../../_redux/actions/user.actions'
import { setPlatformDesktop, setPlatformMobile, setErrorState } from '../../_redux/actions/app.actions.js';
// Router dependencies
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Component dependencies
import Layout from '../layout';
import { SecureRoute } from '../routes';
import ErrorBoundary from '../error-boundary';
import ErrorView from '../error-view';

import LoginForm from '../login-form'
import RegistrationForm from '../registration-form'

import HomeView from '../home-view'
import DiaryView from '../diary-view'
import AccountView from '../account-view'
import DiaryCreationForm from '../diary-creation-form';
// Style dependencies
import Style from './app.module.scss';


class App extends React.Component {

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize)
        this.onWindowResize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = () => {
        if (window.innerWidth > 600) {
            this.props.setPlatformDesktop(window.innerWidth)
        } else {
            this.props.setPlatformMobile(window.innerWidth)
        }
    }

    render() {
        var RouteSet
        if (this.props.user.isAuthorised) {
            if (this.props.platform === "DESKTOP") {
                RouteSet = [
                    <SecureRoute exact={true} key="/" path="/" component={HomeView} />,
                    <SecureRoute key="/diary/:diaryId" path={"/diary/:diaryId"} component={HomeView} />,
                    <SecureRoute key="/createDiary" path={"/createDiary"} component={DiaryCreationForm} />,
                    <SecureRoute exact={true} key="/account" path={"/account"} component={AccountView} />,
                    <Route key="/logOut" path={"/logOut"} render={() => {this.props.submitLogOut(); return(<Redirect to="/" />)}} />,
                    <Redirect key="/register" from="/register" to="/" />
                ]
            } else if (this.props.platform === "MOBILE") {
                RouteSet = [
                    <SecureRoute exact={true} key="/" path="/" component={HomeView} />,
                    <SecureRoute key="/diary/:diaryId" path={"/diary/:diaryId"} component={DiaryView} />,
                    <SecureRoute key="/createDiary" path={"/createDiary"} component={DiaryCreationForm} />,
                    <SecureRoute exact={true} key="/account" path={"/account"} component={AccountView} />,
                    <Route key="/logOut" path={"/logOut"} render={() => {this.props.submitLogOut(); return(<Redirect to="/" />)}} />,
                    <Redirect key="/register" from="/register" to="/" />
                ]
            }
        }
        else {
            RouteSet = [
                <Route key="/" exact path="/" component={LoginForm} />,
                <Route key="/register" exact path="/register" component={RegistrationForm} />,
                <Redirect key="redirectLogin" to="/" />
            ]
        }

        return(
            <div id={Style.app}>
                <BrowserRouter>
                    <Layout>
                        <ErrorBoundary>
                            <Switch>
                                {RouteSet}
                                <Route path={"/error"} component={ErrorView} />
                                <Route render={ ({match}) => {
                                    this.props.setErrorState(new Error(), 404)
                                    return <div></div>
                                } } />
                            </Switch>
                        </ErrorBoundary>
                    </Layout>
                </BrowserRouter>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    platform: state.app.platform
})
    
const mapDispatchToProps = (dispatch) => {
    return {
        setPlatformDesktop: (width) => {
            dispatch(setPlatformDesktop(width))
        },
        setPlatformMobile: (width) => {
            dispatch(setPlatformMobile(width))
        },
        submitLogOut: () => {
            dispatch(logOut())
        },
        setErrorState: (error, code) => {
            dispatch(setErrorState(error, code))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)