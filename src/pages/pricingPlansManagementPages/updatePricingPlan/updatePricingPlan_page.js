import React, { useEffect } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../actions/pricingPlansManagementActoins/updatePricingPlanPage-actions'
import { confirmDialog } from '../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
const UpdatePricingPlan_Page = (props) => {
    useEffect(() => {
        props.dispatch(actions.fetchInitialData(props.pricingPlanID))
        return () => {
            props.dispatch({ type: 'reset-updatePricingPlanPage_reducer' })
        }
    }, [])
    let confirmedFunction
    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm(props.pricingPlanID))
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
    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
            <TopMenu pricingPlanTemplateData={props.pricingPlanTemplateData} />
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

export default connect(({ updatePricingPlanPage_reducer }, props) => {
    return {
        isLoading: updatePricingPlanPage_reducer.isLoading,
        formData: updatePricingPlanPage_reducer.formData,
        pricingPlanTemplateData:
            updatePricingPlanPage_reducer.pricingPlanTemplateData,
        pricingPlanID: props.match.params.pricingPlanID,
    }
})(UpdatePricingPlan_Page)
