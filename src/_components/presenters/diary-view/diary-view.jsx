// React Imports
import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
// Component imports
import DiaryLog from '../../diary-log';
import { CreateEntryForm, EditEntryForm } from '../../diary-entry-form'
// Style Imports
import Style from './diary-view.module.scss';


const DiaryView = (props) => {
    if (props.platform === "DESKTOP") {
        return (
            <div id={Style.desktopDiaryView}>
                <div className={Style.viewHeader}>
                    <h1>My Drinks Diary</h1>
                    <h3>Active</h3>
                </div>
                
                <div className={Style.viewContent}>
                    <Switch>
                        <Route exact path={props.match.url} component={DiaryLog} />
                        <Route path={`${props.match.url}/create`} component={CreateEntryForm} />
                        <Route path={`${props.match.url}/edit`} component={EditEntryForm} />
                        <Route path={`${props.match.url}/exerciseLog`} />
                        <Route path={`${props.match.url}/exerciseLog/create`} />
                        <Route path={`${props.match.url}/exerciseLog/edit`} />
                    </Switch>
                </div>
            </div>
        )
    }
    else if (props.platform === "MOBILE") {
        return (
            <div id={Style.mobileDiaryView}>
                <div className={Style.viewHeader}>
                    <h1>My Drinks Diary</h1>
                    <h7>Active</h7>
                </div>

                <div className={Style.viewContent}>
                    <Switch>
                        <Route exact path={props.match.url} component={DiaryLog} />
                        <Route path={`${props.match.url}/create`} component={CreateEntryForm} />
                        <Route path={`${props.match.url}/edit`} component={EditEntryForm} />
                        <Route path={`${props.match.url}/exerciseLog`} />
                        <Route path={`${props.match.url}/exerciseLog/create`} />
                        <Route path={`${props.match.url}/exerciseLog/edit`} />
                    </Switch>
                </div>
            </div>
        )
    }
    else {
        throw new Error(`Unexpected platoform value: ${props.platform} in component DiaryView`)
    }
}

    
const mapStateToProps = (state) => {
    return {
        platform: state.app.platform
    }
}

export default withRouter(connect(mapStateToProps)(DiaryView))
