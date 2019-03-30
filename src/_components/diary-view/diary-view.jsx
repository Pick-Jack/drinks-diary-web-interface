// React Imports
import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setActiveDiary } from '../../_redux/actions/diary.actions'
// Component imports
import { SecureRoute } from '../routes';
import DiaryLog from '../diary-log';
import EntryForm from '../diary-entry-form'
// Style Imports
import Style from './diary-view.module.scss';
import StatusStyle from '../../_helpers/style-utility/status-indicator.module.scss'


class DiaryView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.props.setActiveDiary(this.props.user.authToken, this.props.match.params.diaryId)
    }

    render() {
        const Routes = () => (
            <Switch>
                <SecureRoute exact={true} path={this.props.match.url} component={DiaryLog} />
                <SecureRoute path={`${this.props.match.url}/create`} render={match => (
                    <EntryForm 
                        match={match}
                        diaryId={this.props.match.params.diaryId} 
                    />
                )} />
                <SecureRoute path={`${this.props.match.url}/edit`} render={match => (
                    <EntryForm
                        match={match}
                        diaryId={this.props.match.params.diaryId} 
                    />
                )} />


                <Route path={`${this.props.match.url}/exerciseLog`} />
                <Route path={`${this.props.match.url}/exerciseLog/create`} />
                <Route path={`${this.props.match.url}/exerciseLog/edit`} />
            </Switch>
        )
    
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopDiaryView}>
                    <div className={Style.viewHeader}>
                        <h1>{this.props.diaryInfo.diaryName}</h1>

                        <div className={StatusStyle.statusIndicator}>
                            {(this.props.diaryInfo.status === "Active") && <div className={StatusStyle.iconSuccess}></div>}
                            {(this.props.diaryInfo.status === "Pending") && <div className={StatusStyle.iconWarning}></div>}
                            {(this.props.diaryInfo.status === "Complete") && <div className={StatusStyle.iconDanger}></div>}
                            <h3>{this.props.diaryInfo.status}</h3>
                        </div>

                    </div>
                    
                    <div className={Style.viewContent}><Routes /></div>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div id={Style.mobileDiaryView}>
                    <div className={Style.viewHeader}>
                        <h1>{this.props.diaryInfo.diaryName}</h1>
                        <div className={StatusStyle.statusIndicator}>
                            {(this.props.diaryInfo.status === "Active") && <div className={StatusStyle.iconSuccess}></div>}
                            {(this.props.diaryInfo.status === "Pending") && <div className={StatusStyle.iconWarning}></div>}
                            {(this.props.diaryInfo.status === "Complete") && <div className={StatusStyle.iconDanger}></div>}
                            <h3>{this.props.diaryInfo.status}</h3>
                        </div>
                    </div>
    
                    <div className={Style.viewContent}><Routes /></div>
                </div>
            )
        }
        else {
            throw new Error(`Unexpected platoform value: ${this.props.platform} in component DiaryView`)
        }
    }

}

    
const mapStateToProps = (state) => {
    return {
        user: state.user,
        diaryInfo: state.diary.info,
        platform: state.app.platform
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveDiary: (authToken, diaryId) => {
            dispatch(setActiveDiary(authToken, diaryId))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryView))
