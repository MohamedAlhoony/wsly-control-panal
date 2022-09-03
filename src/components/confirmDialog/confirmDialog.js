import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { confirmDialog } from '../../actions/layout-actions'
const ConfirmDialog = (props) => {
    return (
        <Modal
            size={'tiny'}
            centered={false}
            open={props.confirmDialog.show}
            onClose={() => props.dispatch(confirmDialog({ show: false }))}
        >
            <Modal.Header>{props.confirmDialog.title}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {props.confirmDialog.body}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    className={'primary'}
                    onClick={() => {
                        props.dispatch(confirmDialog({ show: false }))
                        props.onConfirm()
                    }}
                >
                    {props.confirmDialog.continueBtnText}
                </Button>
                <Button
                    onClick={() =>
                        props.dispatch(confirmDialog({ show: false }))
                    }
                >
                    إغلاق
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default connect(({ layout_reducer }) => {
    return {
        confirmDialog: layout_reducer.confirmDialog,
    }
})(ConfirmDialog)
