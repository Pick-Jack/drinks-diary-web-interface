// React Imports
import React from 'react';
// Style Imports
import Style from './diary-entry.module.scss';


class DiaryEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() { 
        return(
            <div className={Style.diaryEntry} onClick={() => this.props.onClick(true, this.props)}>
                <div className={Style.entryLeft}>
                    <img src={this.props.thumbnail}/>
                    <h6>{this.props.datetime}</h6>     
                </div>

                <h4>{this.props.drinkName}</h4>
                
            </div>
        )
    }
}


export default DiaryEntry