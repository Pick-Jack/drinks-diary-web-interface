// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Component imports
import Modal, {HelpModal} from '../../modals'
// Style imports
import Style from './page-options.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'


class DesktopPageOptions extends React.Component {

    constructor(props) {
        super(props)
        this.state = { displayHelp: false, displayLogout: false }
    }

    onToggleHelp = () => {
        this.setState({displayHelp: !this.state.displayHelp})
    }

    onToggleLogout = () => {
        this.setState({displayLogout: !this.state.displayLogout})
    }

    render() {
        const logoutModalActions = (
            <div style={{display:"flex",flexDirection:"row-reverse",marginRight:"10px"}}>
            <Link to="/logOut" className={ButtonStyle.buttonDanger}>
            <i className="fas fa-sign-out-alt"></i> Logout</Link></div>
        )

        return (
            <div id={Style.desktopPageOptions}>
                <div className={Style.optionsLeft}>
                    <Link to="" className={Style.option}>
                        <i className="fa fa-arrow-left"></i><p>Back</p>
                    </Link>
                </div>

                <div className={Style.optionsRight}>
                    <a className={Style.option} onClick={this.onToggleHelp}>
                        <i className="fa fa-question"></i><p>Help</p>
                    </a>
                    <a className={Style.optionSignOut} onClick={() => this.onToggleLogout()}>
                        <i className="fas fa-sign-out-alt"></i><p>Log Out</p>
                    </a>
                </div>
                
                { 
                    // Display help Modal
                    this.state.displayHelp &&
                    //<Modal title={"Help"} onClose={this.onToggleHelp} actions={helpModalActions}></Modal>
                    <HelpModal closeModal={this.onToggleHelp} />
                }

                { 
                    // Display Logout Modal
                    this.state.displayLogout &&
                    <Modal title={"Logout?"} onClose={this.onToggleLogout} actions={logoutModalActions}>
                        <h5 style={{margin:"0px"}}> Are you sure you want to log-out?</h5>
                    </Modal>
                }
            </div>
        )
    }
}


export default withRouter(DesktopPageOptions)