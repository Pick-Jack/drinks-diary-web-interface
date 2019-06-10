// React imports
import React from 'react';
// Style imports
import Logo from '../../_images/beverage.svg'
import Style from './landing-layout.module.scss'



export default class LandingLayout extends React.Component {
    render () {
        return (
            <div id={Style.LandingLayout}>
                <img src={Logo} />
                <div className={Style.main}>
                    <div className={Style.messageFlashContainer}></div>
                    <div className={Style.content}>{this.props.children}</div>
                </div>
            </div>
        )
    }
}
