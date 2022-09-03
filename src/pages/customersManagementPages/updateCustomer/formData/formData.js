import React, { Fragment } from 'react'
import { Form, Grid, Input, Select } from 'semantic-ui-react'

const FormFields = (props) => {
    const renderFields = () => {
        const formArray = []
        for (let elementName in props.formData) {
            formArray.push({
                id: elementName,
                settings: props.formData[elementName],
            })
        }

        return formArray.map((item, i) => {
            return <Fragment key={i}>{renderTemplates(item)}</Fragment>
        })
    }

    const handleInputChange = (event, id) => {
        let value
        if (id === 'subscription') {
            value = event.value
        } else {
            value = event.target.value
        }
        props.handleFormChange(value, id)
    }

    const renderTemplates = (data) => {
        let formTemplate = ''
        let values = data.settings
        switch (data.id) {
            case 'name':
            case 'username':
            case 'password':
            case 'email':
            case 'phoneNumber':
            case 'walletNumber':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            error={
                                values.errorMsg !== ''
                                    ? {
                                          content: values.errorMsg,
                                      }
                                    : null
                            }
                            control={Input}
                            value={values.value}
                            onChange={(event) =>
                                handleInputChange(event, data.id)
                            }
                            {...values.config}
                            label={values.label && values.labelText + ':'}
                        />
                    </Grid.Column>
                )
                break
            case 'subscription':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            control={Select}
                            {...values.config}
                            fluid
                            onChange={(_, value) => {
                                handleInputChange(value, data.id)
                            }}
                            label={values.labelText}
                            value={values.value}
                            error={
                                values.errorMsg !== ''
                                    ? {
                                          content: values.errorMsg,
                                      }
                                    : null
                            }
                            options={props.subscriptions.map((item) => {
                                return {
                                    text: item.Name,
                                    value: item.Id,
                                    key: item.Id,
                                }
                            })}
                        />
                    </Grid.Column>
                )
                break

            default:
                formTemplate = null
        }
        return formTemplate
    }
    return <Fragment>{renderFields()}</Fragment>
}

export default FormFields
