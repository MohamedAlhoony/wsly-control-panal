import React, { useEffect } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../actions/categoriesManagementActions/updateCategoryPage-actions'
import { confirmDialog } from '../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
const UpdateCategory_Page = (props) => {
    useEffect(() => {
        props.dispatch(actions.fetchInitialData(props.categoryID))
        return () => {
            props.dispatch({ type: 'reset-updateCategoryPage_reducer' })
        }
    }, [])

    const handleFormChange = (value, id) => {
        props.dispatch(actions.changeFormFieldValue(value, id))
    }
    const confirmedSubmitForm = () => {
        props.dispatch(actions.submitForm(props.categoryID))
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
                isPublic={props.isPublic}
                isInternal={props.isInternal}
                handleIsPublicChange={(value) => {
                    props.dispatch(
                        actions.changeFormFieldValue(value, 'isPublic')
                    )
                }}
                handleIsInternalChange={(value) => {
                    props.dispatch(
                        actions.changeFormFieldValue(value, 'isInternal')
                    )
                }}
            />
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

export default connect(({ updateCategoryPage_reducer }, props) => {
    return {
        isLoading: updateCategoryPage_reducer.isLoading,
        formData: updateCategoryPage_reducer.formData,
        isInternal: updateCategoryPage_reducer.formData.isInternal.value,
        isPublic: updateCategoryPage_reducer.formData.isPublic.value,
        categoryID: props.match.params.categoryID,
    }
})(UpdateCategory_Page)
