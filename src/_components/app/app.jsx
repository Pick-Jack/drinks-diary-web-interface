// React dependencies
import React from 'react';
// Redux dependencies
import { connect } from 'react-redux';
import { logOut } from '../../_redux/actions/user.actions'
import { setPlatformDesktop, setPlatformMobile } from '../../_redux/actions/app.actions.js';
// Router dependencies
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// Component dependencies
import Layout from '../layout';
import ErrorBoundary from '../error-boundary'

import LoginForm from '../login-form'
import RegistrationForm from '../registration-form'

import { Home } from '../home';
import AccountView from '../account-view'
import { DiaryView } from '../presenters/diary-view';
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
            RouteSet = [
                <Route key="1" exact path="/" component={Home} />,
                <Route key="2" path={"/createDiary"} component={DiaryCreationForm} />,
                <Route key="3" path={"/diary/:diaryId"} component={DiaryView} />,
                <Route key="4" path={"/logOut"} render={() => {this.props.submitLogOut(); return(<Redirect to="/" />)}} />,
                <Route key="5" exact path={"/account/:accountId"} component={AccountView} />,
                <Redirect key="6" from="/register" to="/" />
            ]
        }
        else {
            RouteSet = [
                <Route key="1" exact path="/" component={LoginForm} />,
                <Route key="2" exact path="/register" component={RegistrationForm} />,
            ]
        }

        return(
            <div id={Style.app}>
                <BrowserRouter>
                    <Layout>
                        <ErrorBoundary>
                            <Switch>
                                {RouteSet}
                                <Route render={ ({match}) => (<h3>404 Not found</h3>) } />
                            </Switch>
                        </ErrorBoundary>
                    </Layout>
                </BrowserRouter>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)