import * as moment from 'moment'
// React Imports
import React from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setActiveDiary, clearDiaryState } from '../../_redux/actions/diary.actions'
// Component imports
import { SecureRoute } from '../routes';
import DiaryLog from '../diary-log';
import DiaryOverview from '../diary-management/diary-overview'
import DiaryEntryForm from '../diary-management/diary-entry-form'
import DiaryConfigurationForm from '../diary-management/diary-configuration-form'
// Style Imports
import Style from './diary-view.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import StatusStyle from '../../_helpers/style-utility/status-indicator.module.scss'


class DiaryView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (this.props.match.params.diaryId) {
            this.props.setActiveDiary(this.props.user.authToken, this.props.match.params.diaryId)
        }
    }

    componentWillUnmount() {
        this.props.clearDiaryState()
    }

    render() {

        /*
        <SecureRoute path={`${this.props.match.url}/create`} render={match => ( <EntryForm match={match} diaryId={this.props.match.params.diaryId} /> )} />
        <SecureRoute path={`${this.props.match.url}/edit`} render={match => ( <EntryForm match={match} diaryId={this.props.match.params.diaryId} /> )} />
        */
        const Routes = () => (
            <Switch>
                <SecureRoute exact={true} path={this.props.match.url} component={DiaryLog} />
                <SecureRoute exact={true} path={`${this.props.match.url}/edit_diary`} component={DiaryConfigurationForm} />
                <SecureRoute exact={true} path={`${this.props.match.url}/create`} component={DiaryEntryForm} />
                <SecureRoute exact={true} path={`${this.props.match.url}/edit`} component={DiaryEntryForm} />
            </Switch>
        )


        const MobileRoutes = () => (
            <Switch>
                <SecureRoute exact={true} path={this.props.match.url} component={DiaryOverview} />
                <SecureRoute exact={true} path={`${this.props.match.url}/edit_diary`} component={DiaryConfigurationForm} />
                <SecureRoute exact={true} path={`${this.props.match.url}/log`} component={DiaryLog} />
                <SecureRoute path={`${this.props.match.url}/create`} component={DiaryEntryForm} />
                <SecureRoute path={`${this.props.match.url}/edit`} render={DiaryEntryForm} />
            </Switch>
        )


    
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopDiaryView}>
                    <div className={Style.viewHeader}>
                        <div className={Style.title}>
                            <h2>Diary: {this.props.diaryInfo.diaryName}</h2>
                            <h4>{this.props.pageTitle}</h4>
                        </div>

                        <div className={Style.info}>

                            <div className={StatusStyle.statusIndicator}>
                                {(this.props.diaryInfo.status === "Active") && <div className={StatusStyle.iconSuccess}></div>}
                                {(this.props.diaryInfo.status === "Pending") && <div className={StatusStyle.iconWarning}></div>}
                                {(this.props.diaryInfo.status === "Complete") && <div className={StatusStyle.iconDanger}></div>}
                                <h3>{this.props.diaryInfo.status}</h3>
                            </div>

                            <div className={Style.dates}>
                                <h5><i className="fa fa-calendar-plus"></i><span>{moment(this.props.diaryInfo.startDate).format("Do MMMM YYYY")}</span></h5>
                                <h5><i className="fa fa-calendar-times"></i><span>{moment(this.props.diaryInfo.endDate).format("Do MMMM YYYY")}</span></h5>
                            </div>

                            <Link to={`${this.props.match.url}/edit_diary`} className={ButtonStyle.button}>
                                <i className="fa fa-cog"></i> Settings
                            </Link>
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
                        <h2>{this.props.diaryInfo.diaryName}</h2>

                        <div className={Style.activityInfo}>
                            <h5 className={Style.pageTitle}>{this.props.pageTitle}</h5>

                            <div className={StatusStyle.statusIndicator}>
                                <h5>{this.props.diaryInfo.status}</h5>
                                {(this.props.diaryInfo.status === "Active") && <div className={StatusStyle.iconSuccess}></div>}
                                {(this.props.diaryInfo.status === "Pending") && <div className={StatusStyle.iconWarning}></div>}
                                {(this.props.diaryInfo.status === "Complete") && <div className={StatusStyle.iconDanger}></div>}
                                
                            </div>                        
                        </div>


                        
                    </div>
    
                    <div className={Style.viewContent}><MobileRoutes /></div>
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
        pageTitle: state.diary.activeTitle,
        platform: state.app.platform
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveDiary: (authToken, diaryId) => {
            dispatch(setActiveDiary(authToken, diaryId))
        },
        clearDiaryState: () => {
            dispatch(clearDiaryState())
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryView))
