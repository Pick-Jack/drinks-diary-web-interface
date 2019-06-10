// React imports 
import React from 'react';
// Component imports
import Modal from '../../modals'
// Style imports
import ButtonStyles from '../../../_helpers/style-utility/buttons.module.scss'


const DeleteEntryModal = (props) => {

    const ModalActions = (
        <div style={{display: "flex", justifyContent: "space-between", padding: "0 15px"}}>
            <button className={ButtonStyles.button} onClick={props.onToggleModal}><i className="fa fa-times"></i> Cancel</button>
            <button className={ButtonStyles.buttonDanger} onClick={props.onDelete}><i className="fa fa-trash"></i> Delete Entry</button>
        </div>
    )

    return (
        <Modal title={"Delete entry?"} actions={ModalActions} onClose={props.onToggleModal}>
            <h4>Are you sure you want to delete this entry?</h4>
            <h4>you will not be able to recover the entry once removed.</h4>
        </Modal>
    )
}


export default DeleteEntryModal