// React dependencies
import React from 'react';
// Redux dependencies
import { connect } from 'react-redux';
import { setPlatformDesktop, setPlatformMobile } from '../../_redux/actions/app.actions.js';
// Router dependencies
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
// Component dependencies
import Layout from '../layout';
import { Home } from '../home';
import { DiaryView } from '../presenters/diary-view'
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
        return(
            <div id={Style.app}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path={"/diary/:diaryId"} component={DiaryView} />
                            <Route render={ ({match}) => (<h3>404 Not found</h3>) } />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        platform: state.platform,
        navOptions: state.navOptions.options,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPlatformDesktop: (width) => {
            dispatch(setPlatformDesktop(width))
        },
        setPlatformMobile: (width) => {
            dispatch(setPlatformMobile(width))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)