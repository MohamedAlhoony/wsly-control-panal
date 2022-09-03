import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PageContainer from '../../../../components/pageContainer/pageContainer'
import { Table, Button, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { CompletePurchase } from '../completePurchase/completePurchase'
const AvailableToPurchaseCartPage = (props) => {
    // useEffect(() => {

    //     return () => {
    //         props.dispatch({ type:'GET_NUMBER_CART'})

    //     }
    // }, [])

    const DeleteCart = (payload) => {
        props.dispatch({
            type: 'DELETE_CART',
            data: payload,
        })
    }

    const IncreaseQuantity = (payload) => {
        props.dispatch({
            type: 'INCREASE_QUANTITY',
            data: payload,
        })
    }
    const DecreaseQuantity = (payload) => {
        props.dispatch({
            type: 'DECREASE_QUANTITY',
            data: payload,
        })
    }

    const CompleteOrder = (cartsItems) => {
        console.log(cartsItems)
    }

    // const GetNumberCart=(payload) =>{

    //         props.dispatch({
    //         type:'GET_NUMBER_CART'
    //     });

    // }

    console.log(props)
    return (
        <PageContainer>
            <Link to="/buy">
                <Button> قائمة المخزون</Button>
            </Link>
            <Table stackable striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>العلامة</Table.HeaderCell>
                        <Table.HeaderCell>الفئة</Table.HeaderCell>
                        <Table.HeaderCell>الكمية</Table.HeaderCell>
                        <Table.HeaderCell>المزود</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.Carts.map((item, key) => {
                        const provierOpetion = item.provider.map(
                            (providerName) => {
                                return {
                                    key: providerName.Id,
                                    value: providerName,
                                    text: providerName.Name,
                                }
                            }
                        )
                        return (
                            <tr key={key}>
                                <td>{item.brand}</td>
                                <td> {item.name} </td>
                                <td>
                                    <Button
                                        onClick={() => IncreaseQuantity(key)}
                                    >
                                        +
                                    </Button>{' '}
                                    {item.quantity}{' '}
                                    <Button
                                        onClick={() => DecreaseQuantity(key)}
                                    >
                                        -
                                    </Button>
                                </td>
                                <td>
                                    <Dropdown
                                        options={provierOpetion}
                                        selection
                                        placeholder="اختر المزود"
                                    ></Dropdown>
                                </td>
                                <td>
                                    <Button onClick={() => DeleteCart(key)}>
                                        <Icon name="delete"></Icon>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </Table.Body>
            </Table>
            <Button primary onClick={() => CompleteOrder(props.Carts)}>
                اتمام العملية
            </Button>
        </PageContainer>
    )
}

export default connect(({ availableToPurchasePage_reducer }) => {
    return {
        availableToPurchase: availableToPurchasePage_reducer.available,
        isLoading: availableToPurchasePage_reducer.isLoading,
        isLoadingMore: availableToPurchasePage_reducer.isLoadingMore,
        isLoadingAvailableToPurchase:
            availableToPurchasePage_reducer.isLoadingAvailable,
        numOfResults: availableToPurchasePage_reducer.numOfResults,
        numberCart: availableToPurchasePage_reducer.numberCart,
        Carts: availableToPurchasePage_reducer.Carts,
    }
})(AvailableToPurchaseCartPage)
