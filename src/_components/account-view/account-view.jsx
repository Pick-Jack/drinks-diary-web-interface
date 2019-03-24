// React Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption, setNavOptions } from '../../_redux/actions/app.actions.js';
// Service imports
import { getAccountDetails } from "../../_services/users.service"
// Style Imports
import Style from './account-view.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import { UnexpectedPlatformError } from '../../_helpers/errors/index.js';
// Moment
import * as moment from 'moment'



class AccountView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        // Set back location
        this.props.setBackOption(this.props.location.state.prevLocation)
        // Set nav options
        this.props.setNavOptions([])
    }

    componentDidMount() {
        // Get account details from API
        getAccountDetails(this.props.authToken)
            .then(response => {
                if(!response.error) {
                    // Calculate age
                    var currentDate = moment()
                    const dob = moment(new Date(response.response.dob))
                    var age = currentDate.diff(dob, 'years')

                    this.setState({ ...response.response, dob, age })
                }
            })
    }

    render() {
        if (Object.keys(this.state).length > 0) {
            if (this.props.platform === "DESKTOP") {
                return(
                    <div id={Style.accountView}>
                        <div className={Style.overview}>
                            <img />
                            
                            <div className={Style.info}>
                                <h3>{`${this.state.forename} ${this.state.surname}`}</h3>
                                <h3>{`${this.state.gender} - ${this.state.age} (Born: ${this.state.dob.format("DD-MM-YYYY")})`}</h3>
                            </div>
                            
                        </div>
        
                        <div className={Style.account}>
                            <div className={Style.details}>
                                <h3>Account Details</h3>
                                <div className={Style.divider}></div>
        
                                <div className={Style.infoRow}>    
                                    <label>E-mail:</label>
                                    <p>{this.state.email}</p>
                                </div>
        
                                <div className={Style.infoRow}>    
                                    <label>Password:</label>
                                    <p>************</p>
                                </div>
        
                            </div>
        
                            <div className={Style.settings}>
                                <h3>Account Settings</h3>
                                <div className={Style.divider}></div>
                            </div>
                        </div>
                    </div>
                )
            } 
            else if (this.props.platform === "MOBILE") {
                return (
                    <div className={Style.mobileAccountView}>
                        <div className={Style.info}>
                            <img />
                            <div className={Style.info}>
                                <h4>{`${this.state.forename} ${this.state.surname}`}</h4>
                                <h7>{`${this.state.gender} - ${this.state.age} (Born: ${this.state.dob.format("DD-MM-YYYY")})`}</h7>
                            </div>
                        </div>

                        <div className={Style.details}>
                            <div className={Style.sectionTitle}>
                                <h4>Account Details</h4>
                                <Link to={`${this.props.match.url}/editDetails`} className={ButtonStyle.buttonXS}><i className="fa fa-pencil-alt"></i> Edit</Link>
                            </div>

                            <div className={Style.infoRow}>    
                                <label>E-mail:</label>
                                <p>{this.state.email}</p>
                            </div>

                            <div className={Style.infoRow}>    
                                <label>Password:</label>
                                <p>************</p>
                            </div>
                        </div>

                        <div className={Style.settings}>
                            <h4 className={Style.sectionTitle}>Account Details</h4>
                        </div>

                    </div>
                )
            }
            else {
                throw new UnexpectedPlatformError(this.props.platform, this.constructor.name)
            }
        } else {
            return null
        }
    } 
}

const mapStateToProps = (state) => ({
    platform: state.app.platform,
    authToken: state.user.authToken
})

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountView))