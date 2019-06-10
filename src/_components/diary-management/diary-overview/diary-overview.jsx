// React import
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { updateActiveTitle } from '../../../_redux/actions/diary.actions'
// Style imports
import Style from './diary-overview.module.scss'
import * as Moment from 'moment'

const DiaryOverview = (props) => {
    
    props.updateActiveTitle("Diary Overview")

    return (
        <div id={Style.diaryOverview}>

            <div className={Style.diaryDates}>
                <h5><i className="fa fa-calendar-plus"></i> Start: {(new Moment(props.diaryInfo.startDate)).format("DD-MM-YYYY")}</h5>
                <h5><i className="fa fa-calendar-times"></i> Ends: {(new Moment(props.diaryInfo.endDate)).format("DD-MM-YYYY")}</h5>
            </div>

            <div className={Style.diaryOptions}>
                <Link to={`${props.match.url}/log`} className={Style.option}>
                    <i className="fa fa-book"></i>
                    <p>Diary Log</p>
                </Link>

                <Link to={`${props.match.url}/create`} className={Style.option}>
                    <i className="fa fa-plus"></i>
                    <p>Create Entry</p>
                </Link>
                
                <Link to={`${props.match.url}/edit_diary`} className={Style.option}>
                    <i className="fa fa-cog"></i>
                    <p>Diary Settings</p>
                </Link>

            </div>

        </div>
    )
}


    
const mapStateToProps = (state) => {
    return {
        diaryInfo: state.diary.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveTitle: (title) => {
            dispatch(updateActiveTitle(title))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryOverview))
