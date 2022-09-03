import React from 'react'
import auth from '../../auth'
import { baseURI } from '../../config'
import * as layoutActions from '../layout-actions'
import { fetchCurrencyExchangeValue } from './currencyDetailsPage-actions'
export const fetchInitialData = (signal) => {
    return async (dispatch, getState) => {
        try {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().currenciesPage_reducer
            dispatch(isLoading(true))
            const currencies = await fetchCurrencies({
                search,
                order,
                nextTo,
                numOfResults,
                signal,
            })
            if (currencies.length) {
                dispatch({
                    type: 'currenciesPage-currencies',
                    data: currencies,
                })
                dispatch({
                    type: 'currenciesPage-nextTo',
                    data: currencies[currencies.length - 1].Id,
                })
            }
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(
                layoutActions.handleHttpError(error, {
                    reload: true,
                    willGoBack: true,
                })
            )
            dispatch(isLoading(false))
        }
    }
}

export const getCurrencies = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().currenciesPage_reducer
            try {
                const currencies = await fetchCurrencies({
                    search,
                    order,
                    nextTo,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'currenciesPage-currencies',
                        data: getState()
                            .currenciesPage_reducer.currencies.slice()
                            .concat(currencies),
                    })
                } else {
                    dispatch({
                        type: 'currenciesPage-currencies',
                        data: currencies,
                    })
                }

                if (currencies.length) {
                    dispatch({
                        type: 'currenciesPage-nextTo',
                        data: currencies[currencies.length - 1].Id,
                    })
                }
                resolve(currencies)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const fetchCurrencies = ({
    search,
    order,
    numOfResults,
    nextTo,
    signal,
}) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            signal,
        }
        try {
            var response = await fetch(
                `${baseURI}/api/Currency?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.Currencies)
            } else {
                reject({ code: body?.errorCode, message: body?.message })
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const loadMore = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoadingMore(true))
            let currencies = await dispatch(getCurrencies(undefined, true))
            if (
                currencies.length <
                getState().currenciesPage_reducer.numOfResults
            ) {
                dispatch(showLoadingMoreBtn(false))
            } else {
                dispatch(showLoadingMoreBtn(true))
            }
            dispatch(isLoadingMore(false))
        } catch (error) {
            dispatch(isLoadingMore(false))
        }
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'currenciesPage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'currenciesPage-isLoadingMore', data: isLoading })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'currenciesPage-showLoadingMoreBtn', data: isLoading })
    }
}

export const isLoadingCurrencies = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'currenciesPage-isLoadingCurrencies',
            data: isLoading,
        })
    }
}

export const currencyExchangeValueModal = (changedFields) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'currenciesPage-currencyExchangeValueModal',
            data: {
                ...getState().currenciesPage_reducer.currencyExchangeValueModal,
                ...changedFields,
            },
        })
    }
}

export const resetCurrencyExchangeValueModalState = () => {
    return (dispatch) => {
        dispatch({
            type: 'currenciesPage-currencyExchangeValueModal',
            data: {
                show: false,
                currency: null,
                isLoading: false,
                currentCurrencyExchangeValue: null,
                exchangeValueFormInput: {
                    value: '',
                    errorMsg: '',
                },
            },
        })
    }
}
export const currencyExchangeValueModalInputFieldValue = (value) => {
    return (dispatch, getState) => {
        if (
            value === '' ||
            /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)
        ) {
            dispatch({
                type:
                    'currenciesPage-currencyExchangeValueModal-exchangeValueFormInput-value',
                data: value,
            })
        }
    }
}

export const getExchangeValue = (Id) => {
    return async (dispatch) => {
        try {
            dispatch(currencyExchangeValueModal({ isLoading: true }))
            const exchangeValue = await fetchCurrencyExchangeValue(Id)
            dispatch(currencyExchangeValueModal({ isLoading: false }))
            dispatch(
                currencyExchangeValueModal({
                    currentCurrencyExchangeValue: exchangeValue
                        ? exchangeValue
                        : '',
                })
            )
        } catch (error) {
            dispatch(currencyExchangeValueModal({ isLoading: false }))
            dispatch(resetCurrencyExchangeValueModalState())
            dispatch(layoutActions.handleHttpError(error))
            // dispatch(
            //     layoutActions.alertModal({
            //         show: true,
            //         isSuccess: false,
            //         body: 'فشل تحميل سعر الصرف الحالي',
            //     })
            // )
        }
    }
}

const sendCurrencyExchangeValue = (currencyExchangeValueModalState) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        var urlencoded = new URLSearchParams()
        urlencoded.append(
            'ExchangeValue',
            currencyExchangeValueModalState.exchangeValueFormInput.value
        )
        urlencoded.append('Id', currencyExchangeValueModalState.currency.Id)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${baseURI}/api/Currency/UpdateExchangeValue`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve()
            } else {
                reject({ code: body?.errorCode, message: body?.message })
            }
        } catch (error) {
            reject(error)
        }
    })
}
export const submitCurrencyExchangeValue = () => {
    return async (dispatch, getState) => {
        const currencyExchangeValueModalState = getState()
            .currenciesPage_reducer.currencyExchangeValueModal
        try {
            dispatch(currencyExchangeValueModal({ isLoading: true }))
            await sendCurrencyExchangeValue(currencyExchangeValueModalState)
            dispatch(resetCurrencyExchangeValueModalState())
            dispatch(
                layoutActions.alertModal({
                    show: true,
                    body: [
                        <span key={1}>تم تغيير سعر صرف العملة &nbsp;</span>,
                        <span key={2}>
                            "{currencyExchangeValueModalState.currency.Name}"
                            &nbsp;
                        </span>,
                        <span key={3}>إلى&nbsp;</span>,
                        <span key={4} style={{ color: 'Highlight' }}>
                            {
                                currencyExchangeValueModalState
                                    .exchangeValueFormInput.value
                            }
                        </span>,
                    ],
                })
            )
        } catch (error) {
            dispatch(layoutActions.handleHttpError(error))
            dispatch(currencyExchangeValueModal({ isLoading: false }))
            // dispatch(
            //     layoutActions.alertModal({
            //         isSuccess: false,
            //         show: true,
            //     })
            // )
        }
    }
}
