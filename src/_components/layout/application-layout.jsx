// React Imports
import React from 'react';
// Component Imports
import { Header } from '../presenters/header';
// Style Imports
import Style from './application-layout.module.scss';


export class DesktopApplicationLayout extends React.Component {

    render() {       
        return (
            <div id={Style.desktopLayout}>
                <Header />

                <div className={Style.page}>
                    <div className={Style.pageNav}>
                        <ul>
                            {this.props.navOptions.map( (item, index) => 
                                (<li key={index.toString()}>{item}</li>))}
                        </ul>
                    </div>
                    
                    <div className={Style.pageContent}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}


export class MobileApplicationLayout extends React.Component {
    render () {
        return (
            <div id={Style.mobileLayout}>

            </div>
        )
    }
}