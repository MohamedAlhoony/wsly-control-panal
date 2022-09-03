import auth from '../../auth'
import { baseURI } from '../../config'
import * as layoutActions from '../layout-actions'
export const fetchInitialData = (signal) => {
    return async (dispatch, getState) => {
        try {
            const {
                search,
                nextTo,
                order,
                numOfResults,
            } = getState().subscriptionsPage_reducer
            dispatch(isLoading(true))
            const subscriptions = await fetchSubscriptions({
                search,
                nextTo,
                order,
                numOfResults,
                signal,
            })
            if (subscriptions.length) {
                dispatch({
                    type: 'subscriptionsPage-subscriptions',
                    data: subscriptions,
                })
                dispatch({
                    type: 'subscriptionsPage-nextTo',
                    data: subscriptions[subscriptions.length - 1].CreatedDate,
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

export const getSubscriptions = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                nextTo,
                order,
                numOfResults,
            } = getState().subscriptionsPage_reducer
            try {
                const subscriptions = await fetchSubscriptions({
                    search,
                    nextTo,
                    order,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'subscriptionsPage-subscriptions',
                        data: getState()
                            .subscriptionsPage_reducer.subscriptions.slice()
                            .concat(subscriptions),
                    })
                } else {
                    dispatch({
                        type: 'subscriptionsPage-subscriptions',
                        data: subscriptions,
                    })
                }
                if (subscriptions.length) {
                    dispatch({
                        type: 'subscriptionsPage-nextTo',
                        data:
                            subscriptions[subscriptions.length - 1].CreatedDate,
                    })
                }
                resolve(subscriptions)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const fetchSubscriptions = ({
    search,
    nextTo,
    order,
    numOfResults,
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
                `${baseURI}/api/Subscription?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.Subscriptions)
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
            let subscriptions = await dispatch(
                getSubscriptions(undefined, true)
            )
            if (
                subscriptions.length <
                getState().subscriptionsPage_reducer.numOfResults
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
        dispatch({ type: 'subscriptionsPage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'subscriptionsPage-isLoadingMore', data: isLoading })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'subscriptionsPage-showLoadingMoreBtn',
            data: isLoading,
        })
    }
}

export const isLoadingSubscriptions = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'subscriptionsPage-isLoadingSubscriptions',
            data: isLoading,
        })
    }
}

export const subscriptionUpdatePricesModal = (changedFields) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'subscriptionsPage-subscriptionUpdatePricesModal',
            data: {
                ...getState().subscriptionsPage_reducer
                    .subscriptionUpdatePricesModal,
                ...changedFields,
            },
        })
    }
}

export const resetSubscriptionUpdatePricesModalState = () => {
    return (dispatch) => {
        dispatch({
            type: 'subscriptionsPage-subscriptionUpdatePricesModal',
            data: {
                show: false,
                body: '',
                subscription: null,
                isLoading: false,
                rateValueFormInput: {
                    value: '',
                    errorMsg: '',
                },
                opType: 1,
            },
        })
    }
}
export const subscriptionUpdatePricesModalInputFieldValue = (value) => {
    return (dispatch, getState) => {
        if (
            value === '' ||
            /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)
        ) {
            dispatch({
                type:
                    'subscriptionsPage-subscriptionUpdatePricesModal-rateValueFormInput-value',
                data: value,
            })
        }
    }
}

const sendSubscriptionPrices = (subscriptionUpdatePricesModalState) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        var urlencoded = new URLSearchParams()
        urlencoded.append(
            'RateValue',
            subscriptionUpdatePricesModalState.rateValueFormInput.value
        )
        urlencoded.append(
            'Id',
            subscriptionUpdatePricesModalState.subscription.Id
        )
        urlencoded.append('OpType', subscriptionUpdatePricesModalState.opType)
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${baseURI}/api/Subscription/UpdatePrices`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body)
            } else {
                reject({ code: body?.errorCode, message: body?.message })
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const submitSubscriptionPrices = () => {
    return async (dispatch, getState) => {
        const subscriptionUpdatePricesModalState = getState()
            .subscriptionsPage_reducer.subscriptionUpdatePricesModal
        try {
            dispatch(subscriptionUpdatePricesModal({ isLoading: true }))
            await sendSubscriptionPrices(subscriptionUpdatePricesModalState)
            dispatch(resetSubscriptionUpdatePricesModalState())
            dispatch(
                layoutActions.alertModal({
                    show: true,
                    redirectBtnText: 'عرض الفئات',
                    redirectBtnPath: `/subscriptions/${subscriptionUpdatePricesModalState.subscription.Id}/denominations`,
                })
            )
        } catch (error) {
            dispatch(subscriptionUpdatePricesModal({ isLoading: false }))
            dispatch(layoutActions.handleHttpError(error))
        }
    }
}
