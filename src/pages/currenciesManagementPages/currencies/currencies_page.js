import React, { useEffect } from 'react'
import * as actions from '../../../actions/currenciesManagementActions/currenciesPage-actions'
import { connect } from 'react-redux'
import { Segment, Button, Table, Loader, Message } from 'semantic-ui-react'
import debounce from 'lodash.debounce'
import PageContainer from '../../../components/pageContainer/pageContainer'
import TopMenu from './topMenu/topMenu'
import CurrenciesTableItems from './currenciesTableItems/currenciesTableItems'
import CurrencyExchangeModal from './currencyExchangeModal/currencyExchangeModal'
import ConfirmDialog from '../../../components/confirmDialog/confirmDialog'
import { confirmDialog } from '../../../actions/layout-actions'
let wrappingFunction = null
const _debouncedFetching = debounce(() => {
    wrappingFunction()
}, 700)
const Currencies_page = (props) => {
    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        props.dispatch(actions.fetchInitialData(signal))
        return () => {
            props.dispatch({ type: 'reset-currenciesPage_reducer' })
            controller.abort()
        }
    }, [])
    const handleTopMenuChange = (value, meta) => {
        props.dispatch({ type: `currenciesPage-${meta.id}`, data: value })

        if (meta.id === 'search') {
            if (value.trim() !== props.search.trim()) {
                _debouncedFetching()
            }
        } else {
            wrappingFunction()
        }
    }

    wrappingFunction = () => {
        props.dispatch(actions.isLoadingCurrencies(true))
        props.dispatch({
            type: 'currenciesPage-nextTo',
            data: 0,
        })
        if (!props.showLoadingMoreBtn) {
            props.dispatch(actions.showLoadingMoreBtn(true))
        }
        props
            .dispatch(actions.getCurrencies())
            .then(() => {
                props.dispatch(actions.isLoadingCurrencies(false))
            })
            .catch(() => {
                props.dispatch(actions.isLoadingCurrencies(false))
            })
    }
    const closeCurrencyExchangeValueModal = () => {
        props.dispatch(actions.resetCurrencyExchangeValueModalState())
    }

    const handleClickExchangeCurrencyValueButton = (currency) => {
        props.dispatch(
            actions.currencyExchangeValueModal({ show: true, currency })
        )
        props.dispatch(actions.getExchangeValue(currency.Id))
    }
    const handleExchangeCurrencyInputFieldChange = (value) => {
        props.dispatch(actions.currencyExchangeValueModalInputFieldValue(value))
    }
    const submitCurrencyExchangeValue = () => {
        if (props.currencyExchangeValueModal.currency)
            props.dispatch(
                confirmDialog({
                    show: true,
                    continueBtnText: `تأكيد تغيير السعر إلى ${props.currencyExchangeValueModal.exchangeValueFormInput.value}`,
                    body: [
                        <Message color={'red'} key={0}>
                            <Message.Header>انتبه!</Message.Header>
                            انت على وشك تغيير سعر صرف عملة "
                            {props.currencyExchangeValueModal.currency.Name}"
                            بالنسبة للدينار الليبي, علماً بأن سوف يتم تغيير
                            اسعار جميع الفئات المرتبطة بالعملة
                        </Message>,
                    ],
                })
            )
    }
    const confirmedSubmitCurrencyExchangeValue = () => {
        props.dispatch(actions.submitCurrencyExchangeValue())
    }
    return (
        <PageContainer loading={props.isLoading}>
            <ConfirmDialog onConfirm={confirmedSubmitCurrencyExchangeValue} />
            <CurrencyExchangeModal
                submitCurrencyExchangeValue={submitCurrencyExchangeValue}
                closeCurrencyExchangeValueModal={
                    closeCurrencyExchangeValueModal
                }
                currencyExchangeValueModal={props.currencyExchangeValueModal}
                handleExchangeCurrencyInputFieldChange={
                    handleExchangeCurrencyInputFieldChange
                }
            />
            <TopMenu
                isLoadingCurrencies={props.isLoadingCurrencies}
                handleTopMenuChange={handleTopMenuChange}
                search={props.search}
                order={props.order}
            />
            {!props.isLoadingCurrencies ? (
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>اسم العملة</Table.HeaderCell>
                            <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
                            <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <CurrenciesTableItems
                            handleClickExchangeCurrencyValueButton={
                                handleClickExchangeCurrencyValueButton
                            }
                            currencies={props.currencies}
                        />
                    </Table.Body>
                    {props.currencies.length > props.numOfResults - 1 ||
                    props.currencies.length === 0 ? (
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={4}>
                                    {props.currencies.length >
                                        props.numOfResults - 1 &&
                                    props.showLoadingMoreBtn ? (
                                        !props.isLoadingCurrencies ? (
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
                                    ) : props.currencies.length !== 0 ? (
                                        <span style={{ color: 'GrayText' }}>
                                            &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                                        </span>
                                    ) : !props.isLoadingCurrencies ? (
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

export default connect(({ currenciesPage_reducer }) => {
    return {
        order: currenciesPage_reducer.order,
        search: currenciesPage_reducer.search,
        currencies: currenciesPage_reducer.currencies,
        showLoadingMoreBtn: currenciesPage_reducer.showLoadingMoreBtn,
        isLoading: currenciesPage_reducer.isLoading,
        isLoadingMore: currenciesPage_reducer.isLoadingMore,
        isLoadingCurrencies: currenciesPage_reducer.isLoadingCurrencies,
        numOfResults: currenciesPage_reducer.numOfResults,
        currencyExchangeValueModal:
            currenciesPage_reducer.currencyExchangeValueModal,
    }
})(Currencies_page)
