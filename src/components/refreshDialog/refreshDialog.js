import React from 'react'
import { Modal, Button, Icon, Header } from 'semantic-ui-react'
const RefreshDialog = (props) => {
    return (
        <Modal
            dimmer={'inverted'}
            closeOnDimmerClick={false}
            open={props.visible}
            onClose={() => {
                props.handleRefreshPress(false)
            }}
            size="small"
        >
            <Header textAlign={'center'}>
                <Icon name={'frown'} />
                فشل التحميل
            </Header>
            <Modal.Description>
                <ul>
                    <li>تأكد من اتصالك بالإنترنت</li>
                </ul>
            </Modal.Description>
            <Modal.Actions style={{ textAlign: 'center' }}>
                <Button
                    className={'secondary'}
                    content={'إعادة التحميل'}
                    icon={'redo'}
                    size={'huge'}
                    onClick={props.handleRefreshPress}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default RefreshDialog
