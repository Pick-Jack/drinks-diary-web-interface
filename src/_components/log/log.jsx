// React Imports
import React from 'react';
// Style Imports
import Style from './log.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'


class Log extends React.Component {

    singleLogView = (props) => (
        <div className={Style.singleLogView}>
            <div className={Style.logDate}>
                <div className={Style.prev}>
                    <i className="fa fa-chevron-left"></i>
                    <i className="fa fa-chevron-left"></i>
                </div>
                
                <h4>10/05/2019</h4>

                <div className={Style.next}>
                    <i className="fa fa-chevron-right"></i>
                    <i className="fa fa-chevron-right"></i>
                </div>
            </div>
    
            <div className={Style.logMain}>
                {props.children}
            </div>
        </div>
    )

    render() {
        const LogView = this.singleLogView
        return (
            <div className={Style.log}>
                <div className={Style.logActions}>
                    <div className={Style.displayOptions}>
                        <button className={ButtonStyle.buttonXS}><i className="fa fa-calendar-day"></i></button>
                        <button className={ButtonStyle.buttonXS}><i className="fa fa-calendar-week"></i></button>
                    </div>
                </div>

                <LogView>{this.props.children}</LogView>
            </div>
        )
    }
}


export default Log
