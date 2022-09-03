import React, { useEffect } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../actions/customersManagementActions/updateCustomerPage-actions'
import { confirmDialog } from '../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
const RegisterCustomer_Page = (props) => {
    let confirmDialogFunc
    let _
    useEffect(() => {
        props.dispatch(actions.fetchInitialData(props.customerID))
        return () => {
            props.dispatch({ type: 'reset-updateCustomerPage_reducer' })
        }
    }, [])
    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm(props.customerID))
    }
    const submitForm = () => {
        confirmDialogFunc = confirmedSubmitForm
        props.dispatch(
            actions.preSubmitValidation((isFormValid) => {
                if (isFormValid) {
                    props.dispatch(confirmDialog({ show: true }))
                }
            })
        )
    }
    const ConfirmedhandleStateChange = (isActive) => {
        props.dispatch(actions.updateCustomerState(props.customerID, isActive))
    }
    const handleStateChange = (isActive) => {
        _ = isActive
        confirmDialogFunc = ConfirmedhandleStateChange
        props.dispatch(
            confirmDialog({
                show: true,
                body: !isActive
                    ? 'هل أنت متأكد من رغبتك في إلغاء تفعيل الحساب؟'
                    : 'هل أنت متأكد من رغبتك في تفعيل الحساب؟',
            })
        )
    }
    const ConfirmedhandleResetPassword = () => {
        props.dispatch(actions.resetPassword(props.customerID))
    }
    const handleResetPassword = () => {
        confirmDialogFunc = ConfirmedhandleResetPassword
        props.dispatch(
            confirmDialog({
                show: true,
                body: 'هل أنت متأكد من رغبتك في إعادة تعيين كلمة السر؟',
            })
        )
    }
    return (
        <PageContainer loading={props.isLoading}>
            <TopMenu
                handleResetPassword={handleResetPassword}
                handleStateChange={handleStateChange}
                isActive={props.isActive}
            />
            <ConfirmDialog
                onConfirm={() => {
                    confirmDialogFunc(_)
                }}
            />
            <Form>
                <Segment>
                    <Grid columns={'three'} stackable>
                        <Grid.Row>
                            <FormData
                                handleFormChange={handleFormChange}
                                formData={props.formData}
                                subscriptions={props.subscriptions}
                            />
                            <Grid.Column width={'sixteen'}>
                                <Button
                                    onClick={() => {
                                        submitForm()
                                    }}
                                    className={'primary'}
                                    content={'تحديث'}
                                />
                                <Button
                                    content={'إغلاق'}
                                    onClick={() => props.history.goBack()}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
        </PageContainer>
    )
}

export default connect(({ updateCustomerPage_reducer }, props) => {
    return {
        isActive: updateCustomerPage_reducer.isActive,
        isLoading: updateCustomerPage_reducer.isLoading,
        formData: updateCustomerPage_reducer.formData,
        subscriptions: updateCustomerPage_reducer.subscriptions,
        customerID: props.match.params.customerID,
    }
})(RegisterCustomer_Page)
