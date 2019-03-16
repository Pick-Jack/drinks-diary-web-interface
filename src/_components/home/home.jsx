// React Imports
import React from 'react';
import { Link } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { OptionTypes } from '../../_helpers/enums/index.js';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions.js';
// Component Dependencies
import { DiaryList } from '../diary-list'
// Style dependencies
import { withRouter } from 'react-router-dom'
import Style from './home.module.scss';
import LayoutStyle from '../layout/application-layout.module.scss'


class Home extends React.Component {
    
    constructor(props) {
        super(props)

        // Set the back option
        this.props.setBackOption("/logOut", OptionTypes.logOut)

        // Set the sidebar navigation options for the page
        this.props.setNavOptions([
            {location: "/createDiary", jsx: (<span><i className="fa fa-plus"></i> Create Diary</span>)}
        ])
    }
    
    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopHomeView}>
                    
                    <div className={Style.diaryList}>
                        <DiaryList />
                    </div>

                    <div className={Style.statistics}>
                    </div>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div id={Style.mobileHomeView}>
                    <DiaryList />
                </div>
            )
        }
        else {
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
        setBackOption: (location, type) => {
            dispatch(setBackOption(location, type))  
        },
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
