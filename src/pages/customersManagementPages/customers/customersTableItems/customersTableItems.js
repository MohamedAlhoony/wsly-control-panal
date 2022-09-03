import React from 'react'
import { Table, Dropdown, Icon } from 'semantic-ui-react'
import { dateFormat } from '../../../../config'
import moment from 'moment'
import { Link } from 'react-router-dom'
const CustomersTable = (props) => {
    const getTableItems = (props) => {
        return props.customers.map((customer, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>
                        <Link to={`/customers/${customer.Id}`}>
                            {customer.Name}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{customer.UserName}</Table.Cell>
                    <Table.Cell>{customer.PhoneNumber}</Table.Cell>
                    <Table.Cell>
                        {customer.IsActive ? 'مفعل' : 'غير مفعل'}
                    </Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {moment
                            .utc(customer.CreatedDate)
                            .local()
                            .format(dateFormat)}
                    </Table.Cell>
                    <Table.Cell width={'1'}>
                        <Dropdown
                            icon={<Icon name={'ellipsis horizontal'} fitted />}
                        >
                            <Dropdown.Menu direction={'left'}>
                                <Dropdown.Item
                                    to={`/customers/${customer.Id}/update`}
                                    as={Link}
                                    text={'تعديل البيانات'}
                                    icon={'edit'}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }
    return <>{getTableItems(props)}</>
}

export default CustomersTable
