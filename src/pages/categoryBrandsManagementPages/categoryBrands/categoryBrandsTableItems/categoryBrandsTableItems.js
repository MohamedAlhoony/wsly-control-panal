import React from 'react'
import { Table, Dropdown, Icon } from 'semantic-ui-react'
import { dateFormat } from '../../../../config'
import moment from 'moment'
import { Link } from 'react-router-dom'
const CustomersTable = (props) => {
    const getTableItems = (props) => {
        return props.categoryBrands.map((brand, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{brand.Id}</Table.Cell>
                    <Table.Cell>
                        <Link to={`/brands/${brand.Id}`}>{brand.Name}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        {brand.IsAvailable
                            ? ' ظاهرة للمستخدمين'
                            : 'غير ظاهرة للمستخدمين'}
                    </Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {moment
                            .utc(brand.CreatedDate)
                            .local()
                            .format(dateFormat)}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={'#'}>{brand.CreatedBy.Name}</Link>
                    </Table.Cell>
                    <Table.Cell width={'1'}>
                        <Dropdown
                            icon={<Icon name={'ellipsis horizontal'} fitted />}
                        >
                            <Dropdown.Menu direction={'left'}>
                                <Dropdown.Item
                                    onClick={() => props.removeBrand(brand)}
                                    text={'حذف'}
                                    icon={'trash alternate'}
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
