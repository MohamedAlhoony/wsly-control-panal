import React, { Fragment, useRef } from 'react'
import { Form, Grid, Select, Button, Label } from 'semantic-ui-react'
const csvToJson = require('csvtojson')
const FormFields = (props) => {
    const fileInput = useRef(null)
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

    const readSingleFile = (event) => {
        const reader = new FileReader()
        let csvFile = event.target.files[0]
        if (csvFile) {
            reader.readAsText(csvFile)
            reader.onload = (e) => {
                csvToJson({
                    checkType: true,
                })
                    .fromString(e.target.result)
                    .then((csvRow) => {
                        props.handleFormChange(
                            {
                                value: csvRow,
                                filePath: event.target.value,
                                name: csvFile.name,
                            },
                            'cardsFile'
                        )
                    })
            }
        } else {
            alert('فشلت عملية التحميل للملف!')
        }
    }
    const handleInputChange = (event, id) => {
        let value
        if (['category', 'brand', 'denomination', 'provider'].includes(id)) {
            value = event.value
        } else if (id === 'cardsFile') {
            value = readSingleFile(event)
            return
        } else {
            value = event.target.value
        }
        props.handleFormChange(value, id)
    }
    const getCategoriesListItems = (categories) => {
        let getCategoriesListItemsArray = categories.map((item) => {
            return {
                text: item.Name,
                value: item.Id,
                key: item.Id,
            }
        })
        getCategoriesListItemsArray.splice(0, 0, {
            text: 'الكل',
            value: -1,
            key: -1,
        })
        return getCategoriesListItemsArray
    }
    const renderTemplates = (data) => {
        let formTemplate = ''
        let values = data.settings
        switch (data.id) {
            case 'category':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            loading={props.categories.isLoading}
                            control={Select}
                            {...values.config}
                            fluid
                            onChange={(_, value) => {
                                handleInputChange(value, data.id)
                            }}
                            label={values.labelText + ':'}
                            value={values.value}
                            error={
                                values.errorMsg !== ''
                                    ? {
                                          content: values.errorMsg,
                                      }
                                    : null
                            }
                            disabled={
                                !props.categories.data.length &&
                                !props.categories.isLoading
                                    ? true
                                    : false
                            }
                            options={getCategoriesListItems(
                                props.categories.data
                            )}
                        />
                    </Grid.Column>
                )
                break
            case 'brand':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            loading={props.brands.isLoading}
                            control={Select}
                            {...values.config}
                            fluid
                            onChange={(_, value) => {
                                handleInputChange(value, data.id)
                            }}
                            label={values.labelText + ':'}
                            value={values.value}
                            error={
                                values.errorMsg !== ''
                                    ? {
                                          content: values.errorMsg,
                                      }
                                    : null
                            }
                            disabled={
                                !props.brands.data.length &&
                                !props.brands.isLoading
                                    ? true
                                    : false
                            }
                            options={props.brands.data.map((item) => {
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
            case 'denomination':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            loading={props.denominations.isLoading}
                            control={Select}
                            {...values.config}
                            fluid
                            onChange={(_, value) => {
                                handleInputChange(value, data.id)
                            }}
                            label={values.labelText + ':'}
                            value={values.value}
                            error={
                                values.errorMsg !== ''
                                    ? {
                                          content: values.errorMsg,
                                      }
                                    : null
                            }
                            disabled={
                                !props.denominations.data.length &&
                                !props.denominations.isLoading
                                    ? true
                                    : false
                            }
                            options={props.denominations.data.map((item) => {
                                return {
                                    text: item.CardName,
                                    value: item.Id,
                                    key: item.Id,
                                }
                            })}
                        />
                    </Grid.Column>
                )
                break
            case 'provider':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            loading={props.providers.isLoading}
                            control={Select}
                            {...values.config}
                            fluid
                            onChange={(_, value) => {
                                handleInputChange(value, data.id)
                            }}
                            label={values.labelText + ':'}
                            value={values.value}
                            error={
                                values.errorMsg !== ''
                                    ? {
                                          content: values.errorMsg,
                                      }
                                    : null
                            }
                            disabled={
                                !props.providers.data.length &&
                                !props.providers.isLoading
                                    ? true
                                    : false
                            }
                            options={props.providers.data.map((item) => {
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
            case 'cardsFile':
                formTemplate = (
                    <Grid.Column
                        verticalAlign={'bottom'}
                        style={{ padding: '14px' }}
                    >
                        <Button
                            fluid
                            size={'large'}
                            content={
                                values.value.name === ''
                                    ? 'اختر ملف'
                                    : values.value.name
                            }
                            labelPosition="left"
                            icon={values.value.name !== '' ? 'check' : 'file'}
                            onClick={() => fileInput.current.click()}
                        />
                        {values.errorMsg !== '' ? (
                            <Label basic color={'red'} pointing={'above'}>
                                {values.errorMsg}
                            </Label>
                        ) : null}

                        <input
                            ref={fileInput}
                            value={values.value.filePath}
                            hidden
                            {...values.config}
                            readOnly
                            onChange={(event) => {
                                handleInputChange(event, data.id)
                            }}
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
