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
import EntryForm from '../diary-entry-form'
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
            </Switch>
        )
    
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopDiaryView}>
                    <div className={Style.viewHeader}>
                        <div className={Style.title}>
                            <h2>Diary: {this.props.diaryInfo.diaryName}</h2>
                            <h4>Create Entry</h4>
                        </div>

                        <div className={Style.info}>

                            <div className={StatusStyle.statusIndicator}>
                                {(this.props.diaryInfo.status === "Active") && <div className={StatusStyle.iconSuccess}></div>}
                                {(this.props.diaryInfo.status === "Pending") && <div className={StatusStyle.iconWarning}></div>}
                                {(this.props.diaryInfo.status === "Complete") && <div className={StatusStyle.iconDanger}></div>}
                                <h3>{this.props.diaryInfo.status}</h3>
                            </div>

                            <div className={Style.dates}>
                                <h5><i className="fa fa-calendar-plus"></i>{moment(this.props.diaryInfo.startDate).format("Do MMMM YYYY")}</h5>
                                <h5><i className="fa fa-calendar-times"></i>{moment(this.props.diaryInfo.endDate).format("Do MMMM YYYY")}</h5>
                            </div>

                            <Link to={`${this.props.match.url}/editdiary`} className={ButtonStyle.button}>
                                <i className="fa fa-cog"></i>
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
        clearDiaryState: () => {
            dispatch(clearDiaryState())
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryView))
