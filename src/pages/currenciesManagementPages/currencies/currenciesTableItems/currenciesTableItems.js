import React from 'react'
import { Table, Dropdown, Icon } from 'semantic-ui-react'
import { dateFormat } from '../../../../config'
import moment from 'moment'
import { Link } from 'react-router-dom'
const CurrenciesTable = (props) => {
    const getTableItems = (props) => {
        return props.currencies.map((currency, key) => {
            return (
                <Table.Row key={key}>
                    {/* <Table.Cell>{currency.Id}</Table.Cell> */}
                    <Table.Cell>
                        <Link to={`/currencies/${currency.Id}`}>
                            {currency.Name}
                        </Link>
                    </Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {moment
                            .utc(currency.CreatedDate)
                            .local()
                            .format(dateFormat)}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={'#'}>{currency.CreatedBy.Name}</Link>
                    </Table.Cell>
                    <Table.Cell width={'1'}>
                        <Dropdown
                            icon={<Icon name={'ellipsis horizontal'} fitted />}
                        >
                            <Dropdown.Menu direction={'left'}>
                                <Dropdown.Item
                                    to={`/currencies/${currency.Id}/update`}
                                    as={Link}
                                    text={'تعديل البيانات'}
                                    icon={'edit'}
                                />
                                <Dropdown.Item
                                    text={'تغيير سعر الصرف'}
                                    icon={'exchange'}
                                    onClick={() =>
                                        props.handleClickExchangeCurrencyValueButton(
                                            currency
                                        )
                                    }
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

export default CurrenciesTable
