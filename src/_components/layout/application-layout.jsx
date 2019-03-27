// React Imports
import React from 'react';
// Router imports
import { Link, withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { OptionTypes } from '../../_helpers/enums';
// Component Imports
import MessageFlash from '../message-flash'
import { Header } from '../presenters/header';
import PageOptions from '../presenters/page-options'
// Style Imports
import Style from './application-layout.module.scss';


class ApplicationLayout extends React.Component {

    render() {
        // Render layout dependent on platform
        if (this.props.platform === "DESKTOP") {
            return (
                <div id={Style.desktopLayout}>
                    <Header />
                    <PageOptions />
                    
                    <div className={Style.page}>
                        <div className={Style.pageMain}>
                            <div className={Style.messageFlashContainer}><MessageFlash /></div>
                            <div className={Style.content}>{this.props.children}</div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div id={Style.mobileLayout}>
                    <Header />
                    
                    <div className={Style.page}>
                        {this.props.children}
                    </div>

                </div>
            )
        }
        else {
            throw new Error("Unexpected platform value in layout")
        }
    }
}
       
const mapStateToProps = (state) => ({
    backOption: state.app.backOption,
    navOptions: state.app.navOptions
})

export default withRouter(connect(mapStateToProps)(ApplicationLayout))