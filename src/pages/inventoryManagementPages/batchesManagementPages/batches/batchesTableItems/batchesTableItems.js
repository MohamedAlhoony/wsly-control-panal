import React from 'react'
import { Table, Dropdown, Icon } from 'semantic-ui-react'
import { dateFormat } from '../../../../../config'
import moment from 'moment'
import { Link } from 'react-router-dom'
const BatchesTable = (props) => {
    const getTableItems = (props) => {
        return props.batches.map((batch, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{batch.Id}</Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {moment
                            .utc(batch.CreatedDate)
                            .local()
                            .format(dateFormat)}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={'#'}>{batch.CreatedBy.Name}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        {batch.WithdrawalFromInventoryBy.Name ? (
                            <Link to={'#'}>
                                {batch.WithdrawalFromInventoryBy.Name}
                            </Link>
                        ) : (
                            'لا يوجد'
                        )}
                    </Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {batch.WithdrawalFromInventoryBy.Name
                            ? moment
                                  .utc(batch.WithdrawalFromInventoryDate)
                                  .local()
                                  .format(dateFormat)
                            : 'لا يوجد'}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={`/batches/${batch.Id}/cards`}>
                            عرض البطاقات
                        </Link>
                    </Table.Cell>
                    {/* <Table.Cell width={'1'}>
                        <Dropdown
                            icon={<Icon name={'ellipsis horizontal'} fitted />}
                        >
                            <Dropdown.Menu direction={'left'}>
                                <Dropdown.Item
                                    onClick={() => {
                                        props.confirmBatch(batch.Id)
                                    }}
                                    text={'تأكيد الدفعة'}
                                    icon={'check circle'}
                                />
                                <Dropdown.Item
                                    onClick={() => {
                                        props.withdrawBatch(batch.Id)
                                    }}
                                    text={'سحب الدفعة'}
                                    icon={'remove circle'}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Table.Cell> */}
                </Table.Row>
            )
        })
    }
    return <>{getTableItems(props)}</>
}

export default BatchesTable
