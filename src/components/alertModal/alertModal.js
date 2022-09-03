import React from 'react'
import { Modal, Button, Icon, Header } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
const AlertModal = (props) => {
    const alertModal = props.alertModal
    return (
        <Modal
            open={alertModal.show}
            onClose={() => {
                if (alertModal.willGoBack === true) {
                    props.history.goBack()
                }
                props.closeAlertModal()
            }}
            basic
            size="small"
        >
            <Header icon>
                <Icon
                    name={props.alertModal.isSuccess ? 'checkmark box' : 'x'}
                />
                {props.alertModal.title !== ''
                    ? props.alertModal.title
                    : props.alertModal.isSuccess
                    ? 'نجحت العملية'
                    : 'فشلت العملية'}
            </Header>
            {props.alertModal.body !== '' ? (
                <Modal.Content>
                    <p>{props.alertModal.body}</p>
                </Modal.Content>
            ) : null}
            <Modal.Actions>
                {props.alertModal.reload ? (
                    <Button
                        inverted
                        icon={'redo'}
                        onClick={() => {
                            document.location.reload()
                        }}
                        content={'إعادة التحميل'}
                    />
                ) : null}
                {props.alertModal.redirectBtnPath !== '' &&
                props.alertModal.redirectBtnText !== '' ? (
                    <Button
                        as={Link}
                        to={props.alertModal.redirectBtnPath}
                        className={'primary'}
                        onClick={() => {
                            props.closeAlertModal()
                        }}
                    >
                        {props.alertModal.redirectBtnText}
                    </Button>
                ) : null}
                <Button
                    inverted
                    onClick={() => {
                        if (alertModal.willGoBack === true) {
                            props.history.goBack()
                        }
                        props.closeAlertModal()
                    }}
                >
                    إغلاق
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default withRouter(AlertModal)
