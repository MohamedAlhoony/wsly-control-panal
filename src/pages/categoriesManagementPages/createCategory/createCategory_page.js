import React, { useEffect } from 'react'
import PageContainer from '../../../components/pageContainer/pageContainer'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button } from 'semantic-ui-react'
import FormData from './formData/formData'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import * as actions from '../../../actions/categoriesManagementActions/createCategoryPage-actions'
import { confirmDialog } from '../../../actions/layout-actions'
import TopMenu from './topMenu/topMenu'
const CreateCategory_Page = (props) => {
    useEffect(() => {
        return () => {
            props.dispatch({ type: 'reset-createCategoryPage_reducer' })
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

export default connect(({ createCategoryPage_reducer }) => {
    return {
        isLoading: createCategoryPage_reducer.isLoading,
        formData: createCategoryPage_reducer.formData,
        isInternal: createCategoryPage_reducer.formData.isInternal.value,
        isPublic: createCategoryPage_reducer.formData.isPublic.value,
    }
})(CreateCategory_Page)
