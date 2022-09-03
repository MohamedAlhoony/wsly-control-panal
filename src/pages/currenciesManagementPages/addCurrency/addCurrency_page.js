import React, { useEffect } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../actions/currenciesManagementActions/addCurrencyPage-actions'
import { confirmDialog } from '../../../actions/layout-actions'
const AddCurrency_Page = (props) => {
    useEffect(() => {
        return () => {
            props.dispatch({ type: 'reset-addCurrencyPage_reducer' })
        }
    }, [])

    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm())
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
            <Form>
                <Segment>
                    <Grid columns={'three'} stackable>
                        <Grid.Row>
                            <FormData
                                handleFormChange={handleFormChange}
                                formData={props.formData}
                            />
                            <Grid.Column width={'sixteen'}>
                                <Button
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

export default connect(({ addCurrencyPage_reducer }) => {
    return {
        isLoading: addCurrencyPage_reducer.isLoading,
        formData: addCurrencyPage_reducer.formData,
    }
})(AddCurrency_Page)
