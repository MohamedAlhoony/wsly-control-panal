import React, { Fragment } from 'react'
import { Form, Grid, Input, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { dateFormat } from '../../../../config'
import moment from 'moment'
const CustomerData = (props) => {
    const renderFields = () => {
        const formArray = []
        for (let elementName in props.customerDetails) {
            formArray.push({
                id: elementName,
                settings: props.customerDetails[elementName],
            })
        }

        return formArray.map((item, i) => {
            return <Fragment key={i}>{renderTemplates(item)}</Fragment>
        })
    }

    const showLabel = (label) => {
        return <label>{label}:</label>
    }

    const renderTemplates = (data) => {
        let formTemplate = ''
        let values = data.settings
        switch (data.id) {
            case 'name':
            case 'userName':
            case 'email':
            case 'phoneNumber':
            case 'walletNumber':
            case 'ID':
                // case 'subscriptionID':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            control={Input}
                            readOnly
                            value={values.value}
                            label={values.label + ':'}
                            dir={data.id === 'phoneNumber' ? 'ltr' : 'rtl'}
                        />
                    </Grid.Column>
                )
                break
            case 'createdDate':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            control={Input}
                            readOnly
                            value={moment
                                .utc(values.value)
                                .local()
                                .format(dateFormat)}
                            label={values.label + ':'}
                            dir={'ltr'}
                        />
                    </Grid.Column>
                )
                break
            case 'isActive':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            control={Input}
                            readOnly
                            value={values.value ? '??????' : '????'}
                            label={values.label + ':'}
                        />
                    </Grid.Column>
                )
                break
            case 'subscription':
                formTemplate = (
                    <Grid.Column style={{ padding: '14px' }}>
                        <Form.Field
                            control={Input}
                            readOnly
                            dir={'ltr'}
                            value={values.value.Name}
                            label={values.label + ':'}
                            action={
                                <Button
                                    as={Link}
                                    to={values.link}
                                    content={'??????'}
                                />
                            }
                            fluid
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

export default CustomerData
