import React, { Fragment, useRef } from 'react'
import { Grid, Button, Label, Form, Input } from 'semantic-ui-react'
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
                    colParser: {
                        RatePrice: (item) => {
                            item = Number(item.trim())
                            if (!item || item < 0) {
                                item = -1
                            }
                            return item
                        },
                    },
                })
                    .fromString(e.target.result)
                    .then((csvRow) => {
                        props.handleFormChange(
                            {
                                value: csvRow,
                                filePath: event.target.value,
                                name: csvFile.name,
                            },
                            'pricingPlansEntriesFile'
                        )
                    })
            }
        } else {
            alert('فشلت عملية التحميل للملف!')
        }
    }
    const handleInputChange = (event, id) => {
        let value
        if (id === 'pricingPlansEntriesFile') {
            value = readSingleFile(event)
            return
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
            case 'pricingPlansEntriesFile':
                formTemplate = (
                    <Grid.Column
                        verticalAlign={'bottom'}
                        style={{ padding: '14px' }}
                    >
                        <Button
                            fluid
                            style={{ overflow: 'hidden' }}
                            size={'large'}
                            content={
                                values.value.name === ''
                                    ? 'اختر ملف'
                                    : values.value.name
                            }
                            labelPosition="left"
                            icon={values.value.name !== '' ? 'check' : 'file'}
                            onClick={(e) => {
                                e.preventDefault()
                                fileInput.current.click()
                            }}
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
