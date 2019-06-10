// React Imports 
import React from 'react'
// Router Imports
import { withRouter } from 'react-router-dom'
// Redux Imports
import { connect } from 'react-redux'
import { updateActiveTitle } from '../../../_redux/actions/diary.actions'
// JSX imports
import DesktopDiaryConfigForm from './_desktop'
import MobileDiaryConfigForm from './_mobile'



class DiaryConfigurationForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { deleteModal: false }
        this.props.updateActiveTitle("Diary Settings")
    }

    updateDiaryConfiguration = () => {

    }

    deleteDiary = () => {

    }

    toggleDeleteConfirmation = () => {
        this.setState({ deleteModal: !this.state.deleteModal} )
    }

    render() {
        const splitUrl = this.props.match.url.split("/")
        const backUrl = `/${splitUrl[1]}/${splitUrl[2]}`;

        var DiaryConfigForm;
        if (this.props.platform === "DESKTOP") { 
            DiaryConfigForm = DesktopDiaryConfigForm;
        }
        else if (this.props.platform === "MOBILE") { 
            DiaryConfigForm = MobileDiaryConfigForm;
        }

        return(
            <DiaryConfigForm {...this.props} {...this.state} onDeleteEntry={this.deleteDiary} backUrl={backUrl} 
                toggleDeleteConfirmation={this.toggleDeleteConfirmation} updateDiaryConfiguration={this.updateDiaryConfiguration} 
            />
        ) 
    }
}


const mapStateToProps = (state) => ({
    platform: state.app.platform,
    diary: state.diary.info
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveTitle: (title) => {
            dispatch(updateActiveTitle(title))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiaryConfigurationForm))
