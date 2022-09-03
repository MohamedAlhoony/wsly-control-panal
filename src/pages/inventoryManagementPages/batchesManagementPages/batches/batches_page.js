import React, { useEffect } from 'react'
import * as actions from '../../../../actions/inventoryManagementActions/batchesManagmentActions/batchesPage-actions'
import { connect } from 'react-redux'
import { Segment, Button, Table, Loader } from 'semantic-ui-react'
import debounce from 'lodash.debounce'
import PageContainer from '../../../../components/pageContainer/pageContainer'
import TopMenu from './topMenu/topMenu'
import BatchesTableItems from './batchesTableItems/batchesTableItems'
import ConfirmDialog from '../../../../components/confirmDialog/confirmDialog'
import { confirmDialog } from '../../../../actions/layout-actions'
let wrappingFunction = null
const _debouncedFetching = debounce(() => {
    wrappingFunction()
}, 700)
const Batches_Page = (props) => {
    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        props.dispatch(actions.fetchInitialData(signal))
        return () => {
            props.dispatch({ type: 'reset-batchesPage_reducer' })
            controller.abort()
        }
    }, [])
    const handleTopMenuChange = (value, meta) => {
        props.dispatch({ type: `batchesPage-${meta.id}`, data: value })

        if (meta.id === 'search') {
            if (value.trim() !== props.search.trim()) {
                _debouncedFetching()
            }
        } else {
            wrappingFunction()
        }
    }

    wrappingFunction = () => {
        props.dispatch(actions.isLoadingBatches(true))
        props.dispatch({
            type: 'batchesPage-nextTo',
            data: 0,
        })
        if (!props.showLoadingMoreBtn) {
            props.dispatch(actions.showLoadingMoreBtn(true))
        }
        props
            .dispatch(actions.getBatches())
            .then(() => {
                props.dispatch(actions.isLoadingBatches(false))
            })
            .catch(() => {
                props.dispatch(actions.isLoadingBatches(false))
            })
    }
    let confirmedFunction

    const confimredWithdrawBatch = (batchID) => {
        props.dispatch(actions.withDrawBatch(batchID))
    }
    const confimredConfirmBatch = (batchID) => {
        props.dispatch(actions.confirmBatch(batchID))
    }

    const confirmBatch = (batchID) => {
        confirmedFunction = () => {
            confimredConfirmBatch(batchID)
        }
        props.dispatch(
            confirmDialog({
                show: true,
            })
        )
    }
    const withdrawBatch = (batchID) => {
        confirmedFunction = () => {
            confimredWithdrawBatch(batchID)
        }
        props.dispatch(
            confirmDialog({
                show: true,
            })
        )
    }
    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
            <TopMenu
                isLoadingBatches={props.isLoadingBatches}
                handleTopMenuChange={handleTopMenuChange}
                search={props.search}
                order={props.order}
            />
            {!props.isLoadingBatches ? (
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>معرف الدفعة</Table.HeaderCell>
                            <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
                            <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
                            <Table.HeaderCell>
                                سحب من المخزن من قبل
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                تاريخ السحب من المخزن
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <BatchesTableItems
                            confirmBatch={confirmBatch}
                            withdrawBatch={withdrawBatch}
                            batches={props.batches}
                        />
                    </Table.Body>
                    {props.batches.length > props.numOfResults - 1 ||
                    props.batches.length === 0 ? (
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={7}>
                                    {props.batches.length >
                                        props.numOfResults - 1 &&
                                    props.showLoadingMoreBtn ? (
                                        !props.isLoadingBatches ? (
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
                                    ) : props.batches.length !== 0 ? (
                                        <span style={{ color: 'GrayText' }}>
                                            &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                                        </span>
                                    ) : !props.isLoadingBatches ? (
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

export default connect(({ batchesPage_reducer }) => {
    return {
        order: batchesPage_reducer.order,
        search: batchesPage_reducer.search,
        batches: batchesPage_reducer.batches,
        showLoadingMoreBtn: batchesPage_reducer.showLoadingMoreBtn,
        isLoading: batchesPage_reducer.isLoading,
        isLoadingMore: batchesPage_reducer.isLoadingMore,
        isLoadingBatches: batchesPage_reducer.isLoadingBatches,
        numOfResults: batchesPage_reducer.numOfResults,
    }
})(Batches_Page)
