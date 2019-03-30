// React import
import React from 'react'
// Router import
import { withRouter } from 'react-router-dom'
// Redux import
import { connect } from 'react-redux';
// Component imports
import { DiaryList } from '../diary-list'
import DiaryView from '../diary-view'
//Style import 
import Style from './home-view.module.scss'


class HomeView extends React.Component {
    
    
    render() {
        if (this.props.platform === "DESKTOP") {
            var DiaryViewJsx;
            if (this.props.diaryInfo.diaryId) {
                // Display diary view when there is a selected diary
                DiaryViewJsx = DiaryView
            } else {
                // Display prompt to select diary if none selected
                DiaryViewJsx = () => (
                    <div className={Style.noDiary}>
                        <i className="fa fa-arrow-left"></i>
                        <h3>Please select a diary to display</h3>
                    </div>
                )
            }

            return (
                <div id={Style.desktopHomeView}>
                    <div className={Style.diarySelection}>
                        <DiaryList />
                    </div>
                    
                    <div className={Style.diaryView}>
                        <DiaryViewJsx />
                    </div>
                </div>
            )

        } else if (this.props.platform === "MOBILE") {
            return (
                <div id={Style.mobileHomeView}>
                    <DiaryList />
                </div>
            )
        } else {
            throw new Error(`Unexpected platform value: ${this.props.platform} for component Home`)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        platform: state.app.platform,
        diaryInfo: state.diary.info
    }
}

export default withRouter(connect(mapStateToProps)(HomeView))