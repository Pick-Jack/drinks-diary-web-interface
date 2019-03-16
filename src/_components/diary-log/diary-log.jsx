// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions.js';
// Error imports
import { UnexpectedPlatformError } from '../../_helpers/errors'
// Component imports
import Log from '../log';
import DiaryEntry from './diary-entry';
import DiaryEntryExpand from './diary-entry-expand'
// Image imports
import defaultDrink from '../../_images/default_drink.svg';
// Style Imports
import Style from './diary-log.module.scss';


class DiaryLog extends React.Component {
    constructor(props) {
        super(props)
    
        // Set back option
        this.props.setBackOption("/")
        // Set nav bar options
        this.props.setNavOptions([
            {location: `${this.props.match.url}/create`, jsx: (<span><i className="fa fa-plus"></i> Create Entry</span>)},
            {location: `${this.props.match.url}/exerciseLog`, jsx: (<span><i className="fa fa-book"></i> Exercise Log</span>)}
        ])
   
        this.state = {
            displayExpand: false,
            entryProps: {}
        }
    }

    componentDidMount() {
        // TODO: fetch diary enties from API
    }

    displayExpand = (display=false, entryProps={}) => {
        this.setState({displayExpand: display, entryProps: entryProps})
    }

    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div className={Style.desktopDiaryLog}>
                    <Log>
                        <DiaryEntry onClick={this.displayExpand} drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} 
                                thumbnail={defaultDrink} alchoholic={false} caffeinated={true} />
                        <DiaryEntry onClick={this.displayExpand} drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} 
                                thumbnail={defaultDrink} alchoholic={false} caffeinated={true} />
                        <DiaryEntry onClick={this.displayExpand} drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} 
                                thumbnail={defaultDrink} alchoholic={false} caffeinated={true} />
                    </Log>
                    { this.state.displayExpand && <DiaryEntryExpand match={this.props.match} entryProps={this.state.entryProps} hide={this.displayExpand} /> }
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div className={Style.mobileDiaryLog}>
                    <Log>
                        <DiaryEntry match={this.props.match} onClick={this.displayExpand} 
                        drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} thumbnail={defaultDrink} 
                        alchoholic={false} caffeinated={true} />

                        <Link to={`${this.props.match.url}/create`} className={Style.newEntryOption}>
                            <h6><i className="fa fa-plus"></i></h6>
                            <label>New Entry</label>
                        </Link>
                    </Log>
                </div>
            )
        }
        else {
            throw new UnexpectedPlatformError(this.props.platform, this.constructor.name)
        }
    }
}


const mapStateToProps = (state) => {
    return ({
        platform: state.app.platform
    })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryLog))
