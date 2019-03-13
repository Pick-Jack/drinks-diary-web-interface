// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setNavOptions } from '../../_redux/actions/nav-options.actions.js';
// Component imports
import Log from '../log';
import DiaryEntry from './diary-entry';
// Image imports
import defaultDrink from '../../_images/default_drink.svg';
// Style Imports
import Style from './diary-log.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss';


class DiaryLog extends React.Component {
    constructor(props) {
        super(props)
    
        this.props.setNavOptions([
            (<Link to="/"><i className="fa fa-arrow-left"></i> Back</Link>),
            (<Link to={`${this.props.match.url}/create`}><i className="fa fa-plus"></i> Create Entry</Link>),
            (<Link to={`${this.props.match.url}/exerciseLog`}><i className="fa fa-book"></i> Exercise Log</Link>),
        ])
   
        this.state = {
            displayExpand: false,
            entryProps: {}
        }
    }

    displayExpand = (display=false, entryProps={}) => {
        this.setState({displayExpand: display, entryProps: entryProps})
    }

    render() {
        return (
            <div className={Style.diaryLog}>
                <Log>
                    <DiaryEntry onClick={this.displayExpand} drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} 
                            thumbnail={defaultDrink} alchoholic={false} caffeinated={true} />
                    <DiaryEntry onClick={this.displayExpand} drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} 
                            thumbnail={defaultDrink} alchoholic={false} caffeinated={true} />
                    <DiaryEntry onClick={this.displayExpand} drinkName={"Black Coffee"} volume={"1 Cup"} datetime={"15:15"} 
                            thumbnail={defaultDrink} alchoholic={false} caffeinated={true} />
                </Log>
                { this.state.displayExpand && <DiaryEntryExpand entryProps={this.state.entryProps} hide={this.displayExpand} /> }
            </div>
        )
    }
}

const DiaryEntryExpand = (props) => (
    <div className={Style.diaryExpand}>

        <div className={Style.header}>
            <a onClick={ () => props.hide(false, {}) } className={Style.close}><i className="fa fa-times"></i></a>
            <Link to="" className={ButtonStyle.buttonSM}><i className="fa fa-pencil-alt"></i> Edit</Link>
        </div>

        <div className={Style.main}>
            <img src={props.entryProps.thumbnail} />

            <div className={Style.info}>
                <h4>{props.entryProps.datetime}</h4>
                <h4>{props.entryProps.drinkName}</h4>
                <h4>{props.entryProps.volume}</h4>
            </div>

            <div className={Style.statusFlags}>
                { props.entryProps.alchoholic && <div className={Style.alcoholStatus}><i className="fa fa-cocktail"></i> Contains alcohol</div> }
                { props.entryProps.caffeinated && <div className={Style.caffeinatedStatus}><i className="fa fa-coffee"></i> Contains caffeine</div> }
            </div>
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

export default withRouter(connect(null, mapDispatchToProps)(DiaryLog))
