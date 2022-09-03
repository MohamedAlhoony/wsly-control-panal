import React from 'react'
import { Table } from 'semantic-ui-react'
import { dateFormat } from '../../../../../config'
import moment from 'moment'
const CardsTable = (props) => {
    const getTableItems = (props) => {
        return props.cards.map((card, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell>{card.SerialNumber}</Table.Cell>
                    <Table.Cell>{card.SecretNumber}</Table.Cell>
                    <Table.Cell>{card.BuyPrice}</Table.Cell>
                    <Table.Cell>{card.ProviderBuyPrice}</Table.Cell>
                    <Table.Cell dir={'ltr'}>
                        {moment
                            .utc(card.ExpirationDate)
                            .local()
                            .format(dateFormat)}
                    </Table.Cell>
                </Table.Row>
            )
        })
    }
    return (
        <Table celled stackable striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>البيان</Table.HeaderCell>
                    <Table.HeaderCell>الرقم التسلسلي</Table.HeaderCell>
                    <Table.HeaderCell>الرقم السري</Table.HeaderCell>
                    <Table.HeaderCell>سعر الشراء</Table.HeaderCell>
                    <Table.HeaderCell>سعر شراء المزود</Table.HeaderCell>
                    <Table.HeaderCell>تاريخ انتهاء الصلاحية</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{getTableItems(props)}</Table.Body>
        </Table>
    )
}

export default CardsTable
