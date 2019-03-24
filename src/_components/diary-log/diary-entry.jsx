// React imports
import React from 'react';
// Router imports
import { Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
// Style imports
import Style from './diary-entry.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import { UnexpectedPlatformError } from '../../_helpers/errors';


const DiaryEntry = (props) => {
    console.log(props.expanded)
    if (props.platform === "DESKTOP") {
        return (
            <div className={props.expanded ? Style.diaryEntryExpanded : Style.diaryEntry} onClick={ () => props.onClick(props.entryId) }>
                <div className={Style.expandRow1}>
                    <div className={Style.col1}>
                        <div className={Style.entryThumbnail}>
                            <img src={props.thumbnail} />
                        </div>
                        
                        <div className={Style.info}>
                            <h4>{props.drinkName}</h4>
                            <h5>{props.volume}</h5>
                        </div>
                    </div>

                    <div className={Style.col2}>
                        <Link to={`${props.match.url}/edit`} className={ButtonStyle.buttonXS}><i className="fa fa-pencil-alt"></i> Edit</Link>
                    </div>
                </div>

                <div className={Style.expandRow2}>
                    <h6>{`${props.datetime.getHours()}:${props.datetime.getMinutes()}`}</h6>
                    <div className={Style.statuses}>
                        {
                            props.alcoholic &&
                            <div className={Style.alchStatus}><p>Alcoholic</p> <i className="fa fa-cocktail"></i></div>
                        }
                        {
                            props.caffeinated &&
                            <div className={Style.caffStatus}><p>Caffeinated</p> <i className="fa fa-coffee"></i></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    else if (props.platform === "MOBILE") {
        return (
            <div className={Style.mobileDiaryEntry}>
                <div className={Style.header}>
                    <p className={Style.time}>{`${props.datetime.getHours()}:${props.datetime.getMinutes()}`}</p>
                    <Link to={`${props.match.url}/edit`} className={ButtonStyle.buttonXS}><i className="fa fa-pencil-alt"></i> Edit</Link>
                </div>
                <div className={Style.main}>
                    
                    <img src={props.thumbnail} />

                    <div className={Style.info}>
                        <h4>{props.drinkName}</h4>
                        <h6>{props.volume}</h6>
                    </div>
                    
                </div>
                <div className={Style.footer}>
                    {props.alcoholic && <p><i className="fa fa-cocktail"></i> Alcoholic</p>}
                    {props.caffeinated && <p><i className="fa fa-coffee"></i> Caffeinated</p>}
                </div>
            </div>
        )
    }
    else {
        throw new UnexpectedPlatformError(props.platform, "DiaryEntry")
    }
}

const mapStateToProps = (state) => ({
    platform: state.app.platform
})

export default connect(mapStateToProps)(DiaryEntry)


    /*
        <div className={Style.desktopDiaryEntry} onClick={() => props.onClick(true, props)}>
            <div className={Style.entryLeft}>
                <img src={props.thumbnail}/>
                <h6>{`${props.datetime.getHours()}:${props.datetime.getMinutes()}`}</h6>     
            </div>

            <h4>{props.drinkName}</h4>
        </div>
    */