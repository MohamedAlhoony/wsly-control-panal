import React, { useEffect } from 'react'
import * as actions from '../../../actions/customersManagementActions/customersPage-actions'
import { connect } from 'react-redux'
import { Segment, Button, Table, Loader } from 'semantic-ui-react'
import debounce from 'lodash.debounce'
import PageContainer from '../../../components/pageContainer/pageContainer'
import TopMenu from './topMenu/topMenu'
import CustomersTableItems from './customersTableItems/customersTableItems'
let wrappingFunction = null
const _debouncedFetching = debounce(() => {
    wrappingFunction()
}, 700)
const Costumers_Page = (props) => {
    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        props.dispatch(actions.fetchInitialData(signal))
        return () => {
            props.dispatch({ type: 'reset-customersPage_reducer' })
            controller.abort()
        }
    }, [])
    const handleTopMenuChange = (value, meta) => {
        props.dispatch({ type: `customersPage-${meta.id}`, data: value })

        if (meta.id === 'search') {
            if (value.trim() !== props.search.trim()) {
                _debouncedFetching()
            }
        } else {
            wrappingFunction()
        }
    }

    wrappingFunction = () => {
        props.dispatch(actions.isLoadingCustomers(true))
        props.dispatch({
            type: 'customersPage-nextTo',
            data: 0,
        })
        if (!props.showLoadingMoreBtn) {
            props.dispatch(actions.showLoadingMoreBtn(true))
        }
        props
            .dispatch(actions.getCustomers())
            .then(() => {
                props.dispatch(actions.isLoadingCustomers(false))
            })
            .catch(() => {
                props.dispatch(actions.isLoadingCustomers(false))
            })
    }
    return (
        <PageContainer loading={props.isLoading}>
            <TopMenu
                isLoadingCustomers={props.isLoadingCustomers}
                handleTopMenuChange={handleTopMenuChange}
                search={props.search}
                order={props.order}
            />
            {!props.isLoadingCustomers ? (
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>الإسم</Table.HeaderCell>
                            <Table.HeaderCell>اسم المستخدم</Table.HeaderCell>
                            <Table.HeaderCell>رقم الهاتف</Table.HeaderCell>
                            <Table.HeaderCell>الحالة</Table.HeaderCell>
                            <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <CustomersTableItems customers={props.customers} />
                    </Table.Body>
                    {props.customers.length > props.numOfResults - 1 ||
                    props.customers.length === 0 ? (
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={6}>
                                    {props.customers.length >
                                        props.numOfResults - 1 &&
                                    props.showLoadingMoreBtn ? (
                                        !props.isLoadingCustomers ? (
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
                                    ) : props.customers.length !== 0 ? (
                                        <span style={{ color: 'GrayText' }}>
                                            &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                                        </span>
                                    ) : !props.isLoadingCustomers ? (
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

export default connect(({ customersPage_reducer }) => {
    return {
        order: customersPage_reducer.order,
        search: customersPage_reducer.search,
        customers: customersPage_reducer.customers,
        showLoadingMoreBtn: customersPage_reducer.showLoadingMoreBtn,
        isLoading: customersPage_reducer.isLoading,
        isLoadingMore: customersPage_reducer.isLoadingMore,
        isLoadingCustomers: customersPage_reducer.isLoadingCustomers,
        numOfResults: customersPage_reducer.numOfResults,
    }
})(Costumers_Page)
