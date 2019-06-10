// React imports
import React from 'react'
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Style imports
import Style from './page-options.module.scss'


class MobilePageOptions extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { expanded: false }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({expanded: false})
        }
    }

    toggleOptions = () => {
        this.setState({expanded: !this.state.expanded})
    }

    toggleHelp = () => {

    }

    render() {
        const collapseStyle = !this.state.expanded ? Style.hideCollapsibleOptions : Style.collapsibleOptions
        const chevronStyle =  this.state.expanded ? "fa fa-chevron-up" : "fa fa-chevron-down"

        return (
            <div id={Style.mobilePageOptions}>             

                <div className={Style.pageOptions}>
                    <Link to={`/`} className={Style.option}><i className="fa fa-arrow-left"></i></Link>
                    <button className={Style.option} onClick={this.toggleOptions}><i className={chevronStyle}></i></button>
                </div>   

                <div className={collapseStyle}>
                    
                    <div className={Style.option} onClick={this.toggleHelp}>
                        <h5>Help <i className="fa fa-question"></i></h5>
                    </div>

                    <Link to={`/account`} className={Style.option}>
                        <h5>My Account <i className="fa fa-user-cog"></i></h5>
                    </Link>

                    <Link to={`/logOut`} className={Style.signOutOption}>
                        <h5>Log Out<i className="fa fa-sign-out-alt"></i></h5>
                    </Link>
                </div>

            </div>
        )
    }
}


export default withRouter(MobilePageOptions)