import React, { Fragment, useRef } from 'react'
import { Form, Grid, Input, Label } from 'semantic-ui-react'
const FormFields = (props) => {
    const el = useRef(null)
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
        value = event.target.value
        props.handleFormChange(value, id)
    }

    const renderTemplates = (data) => {
        let formTemplate = ''
        let values = data.settings
        switch (data.id) {
            case 'price':
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
                            disabled={
                                props.smallestBuyingPrice === null
                                    ? true
                                    : false
                            }
                            placeholder={'السعر'}
                            label={
                                values.label && (
                                    <Label>
                                        {props.smallestBuyingPrice !== null
                                            ? `السعر لايجب أن يكون أقل من سعر الشراء: ${props.smallestBuyingPrice}`
                                            : null}
                                    </Label>
                                )
                            }
                        />
                    </Grid.Column>
                )
                break
            case 'ratePrice':
                formTemplate = props.isSelectRatePrice ? (
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
                            disabled={
                                props.smallestBuyingPrice === null
                                    ? true
                                    : false
                            }
                            {...values.config}
                            placeholder={'السعر النسبي'}
                            label={
                                values.label && (
                                    <Label>
                                        {props.smallestBuyingPrice !== null
                                            ? `السعر النسبي لايجب أن يكون أقل من سعر الشراء: ${props.smallestBuyingPrice}`
                                            : null}
                                    </Label>
                                )
                            }
                        />
                    </Grid.Column>
                ) : null
                break
            default:
                formTemplate = null
        }
        return formTemplate
    }
    return <Fragment>{renderFields()}</Fragment>
}

export default FormFields
