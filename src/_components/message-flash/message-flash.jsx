// React imports
import React from 'react'
// Router imports
import { withRouter } from 'react-router-dom'
// Redux imports
import { connect } from 'react-redux'
import { MessageTypes } from '../../_helpers/enums'
import { hideMessage } from '../../_redux/actions/message-flash.actions'
// Style imports
import Style from './message-flash.module.scss'
import { isNull } from 'util';


class MessageFlash extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            displayType: this.props.displayType,
            displayMessage: this.props.displayMessage
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (!isNull(this.props.displayMessage)) {
                this.props.hideMessage()
            }
        })
    }

    componentWillUnmount() {
        this.unlisten();
    }

    closeMessage = () => {
        this.props.hideMessage()
    }

    render() {
        var flashStyle = Style.messageFlashHide
        if (!isNull(this.props.displayMessage)) {
            switch(this.props.displayType) {
                case(MessageTypes.warning):
                    flashStyle = Style.messageFlashWarning
                    break;
                case (MessageTypes.error):
                    flashStyle = Style.messageFlashDanger
                    break;
                default:
                    flashStyle = Style.messageFlash
            }
        }

        return (
            <div className={flashStyle}>
                <div className={Style.message}><p>{this.props.displayMessage}</p></div>
                <div className={Style.close}><a onClick={this.closeMessage}><i className="fa fa-times"></i></a></div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        displayType: state.messageFlash.displayType,
        displayMessage: state.messageFlash.displayMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideMessage: () => {
            dispatch(hideMessage())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageFlash))