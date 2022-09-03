import React, { useEffect } from 'react'
import PageContainer from '../../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../../actions/inventoryManagementActions/batchesManagmentActions/createBatchPage-actions'
import { confirmDialog } from '../../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
import CreatedBatchItemsTable from './createdBatchTable/createdBatchTable'
const CreateBatch_Page = (props) => {
    useEffect(() => {
        props.dispatch(actions.fetchInitialData())
        return () => {
            props.dispatch({ type: 'reset-createBatchPage_reducer' })
        }
    }, [])
    let confirmedFunction
    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
        if (['category', 'brand', 'denomination'].includes(id)) {
            props.dispatch(actions.updateFields(value, id))
        }
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm())
    }
    const submitForm = () => {
        confirmedFunction = confirmedSubmitForm
        props.dispatch(
            actions.preSubmitValidation((isFormValid) => {
                if (isFormValid) {
                    props.dispatch(confirmDialog({ show: true }))
                }
            })
        )
    }
    const confimredConfirmBatch = (batchID) => {
        props.dispatch(actions.confirmBatch(batchID))
    }
    const confirmBatch = (batchID) => {
        confirmedFunction = () => {
            confimredConfirmBatch(batchID)
        }
        props.dispatch(confirmDialog({ show: true }))
    }
    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
            <TopMenu
                provider={props.formData.provider.value}
                denomination={props.formData.denomination.value}
            />
            <Form>
                <Segment>
                    <Grid columns={'three'} stackable>
                        <Grid.Row>
                            <FormData
                                // smallestBuyingPrice={props.smallestBuyingPrice}
                                // isSelectRatePrice={props.isSelectRatePrice}
                                handleFormChange={handleFormChange}
                                formData={props.formData}
                                categories={props.categories}
                                brands={props.brands}
                                denominations={props.denominations}
                                providers={props.providers}
                            />
                            <Grid.Column width={'sixteen'}>
                                <Button
                                    // disabled={
                                    //     props.formData.price.value === ''
                                    //         ? true
                                    //         : false
                                    // }
                                    onClick={() => {
                                        submitForm()
                                    }}
                                    className={'primary'}
                                    content={'رفع البطاقات'}
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
            {props.createdBatchData !== null ? (
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <CreatedBatchItemsTable
                                    cards={props.createdBatchData.Cards}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button
                                    onClick={() =>
                                        confirmBatch(
                                            props.createdBatchData.BatchId
                                        )
                                    }
                                    color={'orange'}
                                    content={'الإضافة إلى المخزون'}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            ) : null}
        </PageContainer>
    )
}

export default connect(({ createBatchPage_reducer }, props) => {
    return {
        isLoading: createBatchPage_reducer.isLoading,
        formData: createBatchPage_reducer.formData,
        categories: createBatchPage_reducer.categories,
        brands: createBatchPage_reducer.brands,
        denominations: createBatchPage_reducer.denominations,
        providers: createBatchPage_reducer.providers,
        createdBatchData: createBatchPage_reducer.createdBatchData,
    }
})(CreateBatch_Page)
