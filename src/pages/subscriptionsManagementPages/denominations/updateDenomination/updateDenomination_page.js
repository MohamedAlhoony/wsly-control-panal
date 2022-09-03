import React, { useEffect } from 'react'
import PageContainer from '../../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../../actions/subscriptionsManagementActions/denominations/updateDenominationPage-actions'
import { confirmDialog } from '../../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
const RegisterCustomer_Page = (props) => {
    let confirmDialogFunc
    let _
    useEffect(() => {
        props.dispatch(
            actions.fetchInitialData(props.subscriptionID, props.denominationID)
        )
        return () => {
            props.dispatch({
                type: 'reset-updateSubscriptionDenominationPage_reducer',
            })
        }
    }, [])

    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
    }
    const confirmedSubmitForm = () => {
        props.dispatch(
            actions.submitForm(props.subscriptionID, props.denominationID)
        )
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
    const confirmedUpdateDenominationAvailability = (isAvailable) => {
        props.dispatch(
            actions.updateDenominationAvailability(
                props.subscriptionID,
                props.denominationID,
                isAvailable
            )
        )
    }
    const updateDenominationAvailability = (isAvailable) => {
        _ = isAvailable
        confirmDialogFunc = confirmedUpdateDenominationAvailability
        props.dispatch(
            confirmDialog({
                show: true,
                body: isAvailable
                    ? 'هل أنت متأكد من رغبتك في إتاحة الفئة؟'
                    : 'هل أنت متأكد من رغبتك في إلغاء إتاحة الفئة؟',
            })
        )
    }
    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog
                onConfirm={() => {
                    confirmDialogFunc(_)
                }}
            />
            <TopMenu
                // denominationDetails={props.denominationDetails}
                isAvailable={props.isAvailable}
                isSelectRatePrice={props.isSelectRatePrice}
                handleIsSelectRatePriceChange={(value) => {
                    props.dispatch(
                        actions.changeFormFieldValue(value, 'isSelectRatePrice')
                    )
                }}
                handleAvailabilityChange={updateDenominationAvailability}
            />
            <Form>
                <Segment>
                    <Grid columns={'three'} stackable>
                        <Grid.Row>
                            <FormData
                                smallestBuyingPrice={props.smallestBuyingPrice}
                                isSelectRatePrice={props.isSelectRatePrice}
                                handleFormChange={handleFormChange}
                                formData={props.formData}
                            />
                            <Grid.Column width={'sixteen'}>
                                <Button
                                    disabled={
                                        props.formData.price.value === ''
                                            ? true
                                            : false
                                    }
                                    onClick={() => {
                                        submitForm()
                                    }}
                                    className={'primary'}
                                    content={'تعديل'}
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

export default connect(
    ({ updateSubscriptionDenominationPage_reducer }, props) => {
        return {
            isLoading: updateSubscriptionDenominationPage_reducer.isLoading,
            formData: updateSubscriptionDenominationPage_reducer.formData,
            subscriptionID: props.match.params.subscriptionID,
            denominationID: props.match.params.denominationID,
            isSelectRatePrice:
                updateSubscriptionDenominationPage_reducer.formData
                    .isSelectRatePrice.value,
            isAvailable:
                updateSubscriptionDenominationPage_reducer.formData.isAvailable
                    .value,
            smallestBuyingPrice:
                updateSubscriptionDenominationPage_reducer.smallestBuyingPrice,
            // denominationDetails:
            //     updateSubscriptionDenominationPage_reducer.denominationDetails,
        }
    }
)(RegisterCustomer_Page)
