// React Imports
import React from 'react';
import update from 'react-addons-update'
import { Link, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import { setBackOption } from '../../_redux/actions/app.actions.js';
// Service imports
import { getAccountDetails } from "../../_services/users.service"
// Component imports
import AccountEditModal from './account-edit-modal'
// Style Imports
import Style from './account-view.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
// Error imports
import { UnexpectedPlatformError } from '../../_helpers/errors/index.js';
// Moment
import * as moment from 'moment'



class AccountView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayEditModal: false,
            userDetails: {}
        }

        // Set back location
        this.props.setBackOption(this.props.location.state.prevLocation)
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

                    this.setState({userDetails: { ...response.response, dob, age }})
                }
            })
    }

    onChangeEmail = (event) => {
        this.setState(update(this.state, {
            userDetails: {
                email: { $set: event.target.value }
            }
        }))
    }

    toggleEditModal = () => {
        this.setState({displayEditModal: !this.state.displayEditModal})
    }

    onUpdateAccountDetails = () => {

    }

    render() {
        if (Object.keys(this.state.userDetails).length > 0) {
            if (this.props.platform === "DESKTOP") {
                return(
                    <div id={Style.desktopAccountView}>
                        <div className={Style.col} id={Style.accountOverview}>
                            <div className={Style.overview}>
                                <img />
                                <div className={Style.info}>
                                    <h2>{`${this.state.userDetails.forename} ${this.state.userDetails.surname}`}</h2>
                                    <h4>{`${this.state.userDetails.age} (Born: ${this.state.userDetails.dob.format("DD-MM-YYYY")})`}</h4>
                                    <h4>{`${this.state.userDetails.gender}`}</h4>
                                </div>
                            </div>

                            <div className={Style.section}>
                                <h3 className={Style.sectionHeader}>Account Details</h3>

                                <div className={Style.sectionInfoRow}>
                                    <label>Role:</label>
                                    <p>{this.state.userDetails.role}</p>
                                </div>

                                <div className={Style.sectionInfoRow}>
                                    <label>E-mail:</label>
                                    <p>{this.state.userDetails.email}</p>
                                </div>

                                <div className={Style.sectionInfoRow}>    
                                    <label>Password:</label>
                                    <p>************</p>
                                </div>
                            </div>

                            <div className ={Style.section}>
                                <h3 className={Style.sectionHeader}>Account Options</h3>
                            
                                <div className={Style.sectionRow}>
                                    <button className={ButtonStyle.button} onClick={this.toggleEditModal}>
                                        <i className="fa fa-pencil-alt"></i> Edit Details
                                    </button>
                                    <button className={ButtonStyle.buttonDanger}>
                                        <i className="fa fa-trash"></i> Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={Style.col} id={Style.accountStatistics}>
                            <div className={Style.section}>
                                <h3 className={Style.sectionHeader}>Account Statistics</h3>
                            </div>
                        </div>


                        {
                            this.state.displayEditModal &&
                            <AccountEditModal 
                                userDetails={this.state.userDetails}
                                onToggleModal={this.toggleEditModal} 
                                onSubmit={this.onUpdateAccountDetails} 
                            />
                        }

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
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountView))