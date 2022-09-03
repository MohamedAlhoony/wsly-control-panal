import React, { useEffect } from 'react'
import * as actions from '../../../actions/inventoryManagementActions/providerPurchaseActions/availableToPurchasePage-actions'
import { connect } from 'react-redux'
import { Segment, Button, Table, Loader } from 'semantic-ui-react'
import debounce from 'lodash.debounce'
import PageContainer from '../../../components/pageContainer/pageContainer'
import TopMenu from './topMenu/topMenu'
import AvailableToPurchaseTable from './availableToPurchaseTableItems/availableToPurchaseTableItems'

let wrappingFunction = null
const _debouncedFetching = debounce(() => {
    wrappingFunction()
}, 700)
const AvailableToPurchase_Page = (props) => {
    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        props.dispatch(actions.fetchInitialData(signal))
        props.dispatch({ type: 'GET_NUMBER_CART' })
        return () => {
            props.dispatch({ type: 'reset-availableToPurchasePage_reducer' })
            controller.abort()
        }
    }, [])
    const handleTopMenuChange = (value, meta) => {
        console.log(value)
        props.dispatch({
            type: `availableToPurchasePage-${meta.id}`,
            data: value,
        })

        if (meta.id === 'search') {
            if (value.trim() !== props.search.trim()) {
                _debouncedFetching()
            }
        } else {
            wrappingFunction()
        }
    }

    wrappingFunction = () => {
        props.dispatch(actions.isLoadingAvailable(true))
        props.dispatch({
            type: 'availableToPurchasePage-nextTo',
            data: 0,
        })
        if (!props.showLoadingMoreBtn) {
            props.dispatch(actions.showLoadingMoreBtn(true))
        }
        props
            .dispatch(actions.getAvailableToPurchase())
            .then(() => {
                props.dispatch(actions.isLoadingAvailable(false))
            })
            .catch(() => {
                props.dispatch(actions.isLoadingAvailable(false))
            })
    }

    const AddCart = (payload) => {
        props.dispatch({ type: 'ADD_CART', data: payload })
    }

    // let confirmedFunction

    // const confimredWithdrawBatch = (batchID) => {
    //     props.dispatch(actions.withDrawBatch(batchID))
    // }
    // const confimredConfirmBatch = (batchID) => {
    //     props.dispatch(actions.confirmBatch(batchID))
    // }

    // const confirmBatch = (batchID) => {
    //     confirmedFunction = () => {
    //         confimredConfirmBatch(batchID)
    //     }
    //     props.dispatch(
    //         confirmDialog({
    //             show: true,
    //         })
    //     )
    // }
    // const withdrawBatch = (batchID) => {
    //     confirmedFunction = () => {
    //         confimredWithdrawBatch(batchID)
    //     }
    //     props.dispatch(
    //         confirmDialog({
    //             show: true,
    //         })
    //     )
    // }
    return (
        <PageContainer loading={props.isLoading}>
            {/* <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} /> */}
            <TopMenu
                isLoadingAvailableToPurchase={
                    props.isLoadingAvailableToPurchase
                }
                handleTopMenuChange={handleTopMenuChange}
                search={props.search}
                order={props.order}
                filter={props.filter}
                cartCount={props.numberCart}
            />
            {!props.isLoadingAvailableToPurchase ? (
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>المزود</Table.HeaderCell>
                            <Table.HeaderCell>الفئة</Table.HeaderCell>
                            <Table.HeaderCell>الكمية</Table.HeaderCell>
                            <Table.HeaderCell>الحد الأدنى</Table.HeaderCell>
                            <Table.HeaderCell>حد وجوب التوريد</Table.HeaderCell>
                            <Table.HeaderCell>الحد الأعلى</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <AvailableToPurchaseTable
                            // confirmBatch={confirmBatch}
                            // withdrawBatch={withdrawBatch}
                            handleAddToCart={AddCart}
                            availableToPurchase={props.availableToPurchase}
                        />
                    </Table.Body>
                    {props.availableToPurchase.length >
                        props.numOfResults - 1 ||
                    props.availableToPurchase.length === 0 ? (
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={7}>
                                    {props.availableToPurchase.length >
                                        props.numOfResults - 1 &&
                                    props.showLoadingMoreBtn ? (
                                        !props.isLoadingAvailableToPurchase ? (
                                            <Button
                                                fluid
                                                loading={props.isLoadingMore}
                                                disabled={
                                                    props.isLoadingMore
                                                        ? true
                                                        : false
                                                }
                                                onClick={() => {
                                                    props.dispatch(
                                                        actions.loadMore()
                                                    )
                                                }}
                                            >
                                                {!props.isLoadingMore ? (
                                                    'عرض المزيد'
                                                ) : (
                                                    <Loader />
                                                )}
                                            </Button>
                                        ) : null
                                    ) : props.availableToPurchase.length !==
                                      0 ? (
                                        <span style={{ color: 'GrayText' }}>
                                            &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                                        </span>
                                    ) : !props.isLoadingAvailableToPurchase ? (
                                        <span>لايوجد نتائج</span>
                                    ) : null}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    ) : null}
                </Table>
            ) : (
                <Segment basic loading={true} />
            )}
        </PageContainer>
    )
}

export default connect(({ availableToPurchasePage_reducer }) => {
    return {
        order: availableToPurchasePage_reducer.order,
        search: availableToPurchasePage_reducer.search,
        availableToPurchase: availableToPurchasePage_reducer.available,
        showLoadingMoreBtn: availableToPurchasePage_reducer.showLoadingMoreBtn,
        isLoading: availableToPurchasePage_reducer.isLoading,
        isLoadingMore: availableToPurchasePage_reducer.isLoadingMore,
        isLoadingAvailableToPurchase:
            availableToPurchasePage_reducer.isLoadingAvailable,
        numOfResults: availableToPurchasePage_reducer.numOfResults,
        filter: availableToPurchasePage_reducer.filter,
        numberCart: availableToPurchasePage_reducer.numberCart,
        Carts: availableToPurchasePage_reducer.Carts,
    }
})(AvailableToPurchase_Page)
