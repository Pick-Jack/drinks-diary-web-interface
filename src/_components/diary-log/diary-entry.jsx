// React imports
import React from 'react';
// Router imports
import { Link } from 'react-router-dom';
// Redux imports
import { connect } from 'react-redux';
// Style imports
import Style from './diary-entry.module.scss';
import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'
import * as Moment from 'moment';



class DiaryEntry extends React.Component {

    constructor(props) {
        super(props)
        this.state = {expand: false}
    }

    toggleExpand = () => {
        this.setState({ expand: !this.state.expand })
    }

    render() {
        if (this.props.platform === "DESKTOP") {
            return (
                <div className={this.state.expand ? Style.diaryEntryExpanded : Style.diaryEntry} onClick={ () => this.toggleExpand()}>
                    <div className={Style.expandRow1}>
                        <div className={Style.col1}>
    
                            <div className={Style.entryThumbnail}> 
                                <img src={this.props.thumbnail} /> 
                            </div>
                            
                            <div className={Style.info}>
                                <h4>{this.props.entry.drinkName}</h4>
                                <h5>{`${this.props.entry.volume.amount} ${this.props.entry.volume.measure}`}</h5>
                            </div>
                        </div>
    
                        <div className={Style.col2}>
                            <button onClick={() => this.props.onEdit(this.props.entry._id)} className={ButtonStyle.buttonXS}><i className="fa fa-pencil-alt"></i> Edit</button>
                        </div>
                    </div>
    
                    <div className={Style.expandRow2}>
                        <h6>{new Moment(this.props.entry.date).format("HH:mm")}</h6>
                        <div className={Style.statuses}>
                            {
                                this.props.entry.containsAlcohol &&
                                <div className={Style.alchStatus}><p>Alcoholic</p> <i className="fa fa-cocktail"></i></div>
                            }
                            {
                                this.props.entry.containsCaffeine &&
                                <div className={Style.caffStatus}><p>Caffeinated</p> <i className="fa fa-coffee"></i></div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.props.platform === "MOBILE") {
            return (
                <div className={Style.mobileDiaryEntry} >
                    <div className={Style.header}>
                        <p className={Style.time}>{new Moment(this.props.entry.date).format("HH:mm")}</p>
                        <Link to={`${this.props.match.url.split("/log")[0]}/edit`} className={ButtonStyle.buttonXS} onClick={() => this.props.onEdit(this.props.entry._id)}>
                        <i className="fa fa-pencil-alt"></i> Edit</Link>
                    </div>

                    <div className={Style.main}>    
                        <img src={this.props.thumbnail} />
    
                        <div className={Style.info}>
                            <h4>{this.props.entry.drinkName}</h4>
                            <h6>{`${this.props.entry.volume.amount} ${this.props.entry.volume.measure}`}</h6>
                        </div>    
                    </div>

                    <div className={Style.footer}>
                        {this.props.entry.containsAlcohol && <p><i className="fa fa-cocktail"></i> Alcoholic</p>}
                        {this.props.entry.containsCaffeine && <p><i className="fa fa-coffee"></i> Caffeinated</p>}
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => ({
    platform: state.app.platform
})

export default connect(mapStateToProps)(DiaryEntry)
