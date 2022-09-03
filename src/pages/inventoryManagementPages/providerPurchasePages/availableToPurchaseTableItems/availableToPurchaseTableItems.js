import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const AvailableToPurchaseTable = (props) => {
    const getTableItems = (props) => {
        return props.availableToPurchase.map((available, key) => {
            return (
                <Table.Row key={key}>
                    <Table.Cell>{available.Name}</Table.Cell>
                    <Table.Cell>{available.Denomination.Name}</Table.Cell>
                    <Table.Cell>{available.Denomination.Quantity}</Table.Cell>
                    <Table.Cell>
                        {available.Denomination.MinimumQuantityLimit}
                    </Table.Cell>
                    <Table.Cell>
                        {available.Denomination.SupplyQuantityLimit}
                    </Table.Cell>
                    <Table.Cell>
                        {available.Denomination.MaximumQuantityLimit}
                    </Table.Cell>
                    <Table.Cell>
                        <Button
                            secondary
                            onClick={() => props.handleAddToCart(available)}
                        >
                            <Icon name="add to cart"></Icon>
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }
    return <>{getTableItems(props)}</>
}

export default AvailableToPurchaseTable
