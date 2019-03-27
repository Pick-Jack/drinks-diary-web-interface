// React import
import React from 'react'
// Router import
import { withRouter } from 'react-router-dom'
// Redux import
import { connect } from 'react-redux';
// Component imports
import { DiaryList } from '../diary-list'
import DiaryView from '../presenters/diary-view'
//Style import 
import Style from './home-view.module.scss'


class HomeView extends React.Component {
    
    componentDidMount() {

    }
    
    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopHomeView}>

                    <div className={Style.diarySelection}>
                        <DiaryList />
                    </div>
                    
                    <div className={Style.diaryView}>
                        <DiaryView />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeView))