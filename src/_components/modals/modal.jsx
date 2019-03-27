// React imports
import React from 'react';
import ReactDOM from 'react-dom';
// Style imports
import Style from './modal.module.scss'
//import ButtonStyle from '../../_helpers/style-utility/buttons.module.scss'


export default class Modal extends React.Component {

    render() {
        var modalSizeClass;
        switch (this.props.size) {
            case "small":
                modalSizeClass = Style.modalSM
                break;
            case "medium":
                modalSizeClass = Style.modalMD
                break;
            case "large":
                modalSizeClass = Style.modalLG
                break;
            default: 
                modalSizeClass = Style.modalMD
        }

        return ReactDOM.createPortal((
            <div className={Style.overlay}>
                
                <div className={modalSizeClass}>

                    <div className={Style.modalHeader}>
                        <h3>{ this.props.title }</h3>
                        <div className={Style.closeModal} onClick={this.props.onClose}>
                            <i className="fa fa-times"></i>
                        </div>
                    </div>

                    <div className={Style.modalBody}>
                        {this.props.children}
                    </div>

                    <div className={Style.modalActions}>
                        {this.props.actions}
                    </div>

                </div>

            </div>
        ),document.getElementById("modal"))
    }
}

