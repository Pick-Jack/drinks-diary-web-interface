// React Imports
import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../../_redux/actions/nav-options.actions';
// Component imports
import DiaryLog from '../../diary-log';
import { CreateEntryForm, EditEntryForm } from '../../diary-entry-form'
// Style Imports
import Style from './diary-view.module.scss';


const DiaryView = (props) => (
    <div id={Style.diaryView}>
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
    
const mapDispatchToProps = (dispatch) => {
    return {
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(DiaryView))
