// React imports
import React from 'react'
// Router imports
import { Link } from 'react-router-dom'
// Component imports
import Modal from '../../modals'
// Style imports
import Style from './page-options.module.scss'
import ButtonStyle from '../../../_helpers/style-utility/buttons.module.scss'


class PageOptions extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { displayHelp: false }
    }

    onToggleHelp = () => {
        this.setState({displayHelp: !this.state.displayHelp})
    }

    render() {
        const helpModalActions = (
            <div><button className={ButtonStyle.button} onClick={this.onToggleHelp}>Close</button></div>
        )

        return (
            <div className={Style.pageOptions}>
                <div className={Style.optionsLeft}>
                    <Link to="" className={Style.option}>
                        <i className="fa fa-arrow-left"></i><p>Back</p>
                    </Link>
                </div>

                <div className={Style.optionsRight}>
                    <a className={Style.option} onClick={this.onToggleHelp}>
                        <i className="fa fa-question"></i><p>Help</p>
                    </a>
                    <Link to="/logOut" className={Style.optionSignOut}>
                        <i className="fas fa-sign-out-alt"></i><p>Log Out</p>
                    </Link>
                </div>
                
                { 
                    // Display help Modal
                    this.state.displayHelp &&
                    <Modal title={"Help"} onClose={this.onToggleHelp} actions={helpModalActions}></Modal>
                }
            </div>
        )
    }
}

export default PageOptions