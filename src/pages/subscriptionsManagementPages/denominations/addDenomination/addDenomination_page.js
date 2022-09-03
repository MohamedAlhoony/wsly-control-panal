import React, { useEffect } from 'react'
import PageContainer from '../../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../../actions/subscriptionsManagementActions/denominations/addDenominationPage-actions'
import { confirmDialog } from '../../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
const RegisterCustomer_Page = (props) => {
    useEffect(() => {
        props.dispatch(actions.fetchInitialData())
        return () => {
            props.dispatch({
                type: 'reset-addSubscriptionDenominationPage_reducer',
            })
        }
    }, [])

    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
        if (['category', 'brand', 'denomination'].includes(id)) {
            props.dispatch(
                actions.updateFields(value, id, props.subscriptionID)
            )
        }
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm(props.subscriptionID))
    }
    const submitForm = () => {
        props.dispatch(
            actions.preSubmitValidation((isFormValid) => {
                if (isFormValid) {
                    props.dispatch(confirmDialog({ show: true }))
                }
            })
        )
    }

    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog onConfirm={confirmedSubmitForm} />
            <TopMenu
                isAvailable={props.isAvailable}
                isSelectRatePrice={props.isSelectRatePrice}
                handleIsSelectRatePriceChange={(value) => {
                    props.dispatch(
                        actions.changeFormFieldValue(value, 'isSelectRatePrice')
                    )
                }}
                handleIsAvailableChange={(value) => {
                    props.dispatch(
                        actions.changeFormFieldValue(value, 'isAvailable')
                    )
                }}
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
                                categories={props.categories}
                                brands={props.brands}
                                denominations={props.denominations}
                                providerDenominations={
                                    props.providerDenominations
                                }
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
                                    content={'إضافة'}
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

export default connect(({ addSubscriptionDenominationPage_reducer }, props) => {
    return {
        isLoading: addSubscriptionDenominationPage_reducer.isLoading,
        formData: addSubscriptionDenominationPage_reducer.formData,
        categories: addSubscriptionDenominationPage_reducer.categories,
        brands: addSubscriptionDenominationPage_reducer.brands,
        denominations: addSubscriptionDenominationPage_reducer.denominations,
        providerDenominations:
            addSubscriptionDenominationPage_reducer.providerDenominations,
        subscriptionID: props.match.params.subscriptionID,
        isSelectRatePrice:
            addSubscriptionDenominationPage_reducer.formData.isSelectRatePrice
                .value,
        isAvailable:
            addSubscriptionDenominationPage_reducer.formData.isAvailable.value,
        smallestBuyingPrice:
            addSubscriptionDenominationPage_reducer.smallestBuyingPrice,
    }
})(RegisterCustomer_Page)
