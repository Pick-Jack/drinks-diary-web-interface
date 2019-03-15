// React Imports
import React from 'react';
// Component Imports
import MessageFlash from '../message-flash'
import { Header } from '../presenters/header';
// Style Imports
import Style from './application-layout.module.scss';


export default class ApplicationLayout extends React.Component {

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
                    
                    <div className={Style.pageMain}>
                        <div className={Style.messageFlashContainer}><MessageFlash /></div>
                        <div className={Style.content}>{this.props.children}</div>
                    </div>
                </div>
            </div>
        )
    }
}
