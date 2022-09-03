import React from 'react'
import { Table, Dropdown, Icon } from 'semantic-ui-react'
import { dateFormat } from '../../../../config'
import moment from 'moment'
import { Link } from 'react-router-dom'
const CustomersTable = (props) => {
    const getTableItems = (props) => {
        return props.categories.map((category, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>
                        <Link to={`/categories/${category.Id}`}>
                            {category.Name}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{category.IsPublic ? 'نعم' : 'لا'}</Table.Cell>
                    <Table.Cell>
                        {category.IsInternal ? 'نعم' : 'لا'}
                    </Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {moment
                            .utc(category.CreatedDate)
                            .local()
                            .format(dateFormat)}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={'#'}>{category.CreatedBy.Name}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={`/categories/${category.Id}/brands`}>
                            عرض العلامات التجارية
                        </Link>
                    </Table.Cell>
                    <Table.Cell width={'1'}>
                        <Dropdown
                            icon={<Icon name={'ellipsis horizontal'} fitted />}
                        >
                            <Dropdown.Menu direction={'left'}>
                                <Dropdown.Item
                                    to={`/categories/${category.Id}/update`}
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
