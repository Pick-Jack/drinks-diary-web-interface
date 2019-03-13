// React Imports
import React from 'react';
import { Link } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../_redux/actions/nav-options.actions.js';
// Component Dependencies
import { DesktopDiary } from './diary-entry';
// Style dependencies
import { withRouter } from 'react-router-dom'
import Style from './home.module.scss';
import LayoutStyle from '../layout/application-layout.module.scss'

class Home extends React.Component {
    
    constructor(props) {
        super(props)

        // Set the sidebar navigation options for the page
        this.props.setNavOptions([
            (<Link to="/logOut" className={LayoutStyle.logOut}><i className="fas fa-sign-out-alt"></i> Log Out</Link>),
            (<Link to="/createDiary"><i className="fa fa-plus"></i> Create Diary</Link>),
        ])
    }
    
    render() {
        return(
            <div id={Style.home}>
                <div className={Style.diaryList}>
                    <DesktopDiary id={"diaryID"} diaryName={"My Drinks Diary"} 
                        duration={"5"} lastEntry={"15 10/05/2019"} status={"Active"} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        platform: state.platform,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavOptions: (optionsArray) => {
            dispatch(setNavOptions(optionsArray))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))