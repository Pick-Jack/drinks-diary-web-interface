// React imports 
import React from 'react';
// Component imports
import Modal from '../modals'
// Style imports
import Style from './account-edit-modal.module.scss'
import ButtonStyles from '../../_helpers/style-utility/buttons.module.scss'
import FormStyle from '../../_helpers/style-utility/form-control.module.scss'


class AccountEditModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            newPassword: "",
            confNewPassword: "",
            currentPassword: "",
            passwordRequired: false
        }
    }

    onChangeInput = (event, key) => {
        this.setState({[key]: event.target.value})
    }

    onChangePassword = (event) => {
        if (event.target.value === "") {
            this.setState({
                passwordRequired: false,
                currentPassword: event.target.value
            })
        } else {
            this.setState({
                passwordRequired: true,
                currentPassword: event.target.value
            })
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log("test")
        //this.props.onSubmit()
        return false
    }

    render() {
        const ModalActions = (
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 15px"}}>
                <button className={ButtonStyles.buttonWarning} onClick={this.props.onToggleModal}>
                    <i className="fa fa-times"></i> Cancel
                </button>
                <button className={ButtonStyles.buttonSuccess} onClick={() => document.getElementById("accountDetailsForm").submit()}>
                    <i className="fa fa-check"></i> Update Details
                </button>
            </div>
        )

        return (
            <Modal title={"Update account details"} actions={ModalActions} onClose={this.props.onToggleModal}>
                <div className={Style.editAccountDetails}>
                    <p>Update the fields you wish to change and then select "Update Details".</p>
                    <form id="accountDetailsForm" onSubmit={(event) => this.onSubmit(event)}>
                        <div className={Style.imgOverlay}>
                            <img />
                            <input type="file" />
                            <div className={Style.editIndicator}><i className="fa fa-pencil-alt"></i></div>
                        </div>
                        
                        <div className={FormStyle.inputGroup}>
                            <label>Current Password:</label>
                            <input type="text" id="currentPassword" className={FormStyle.input} placeholder={"current password..."}
                            onChange={(event) => this.onChangePassword(event)} value={this.props.userDetails.password} />
                        </div>

                        <div className={FormStyle.inputRow}>
                            <div className={FormStyle.inputGroup}>
                                <label>New Password:</label>
                                <input type="text" id="newPassword" className={FormStyle.input} placeholder={"new password..."}
                                onChange={(event) => this.onChangeInput(event, "newPassword")} value={this.props.userDetails.newPassword} 
                                required={this.props.passwordRequired} />
                            </div>
                            <div className={FormStyle.inputGroup}>
                                <label>Confirm New Password:</label>
                                <input type="text" id="confNewPassword" className={FormStyle.input} placeholder={"confirm new password..."}
                                onChange={(event) => this.onChangeInput(event, "confNewPassword")} value={this.props.userDetails.confNewPassword} 
                                required={this.props.passwordRequired} />
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}


export default AccountEditModal