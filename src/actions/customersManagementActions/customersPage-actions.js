import auth from '../../auth'
import { baseURI } from '../../config'
import * as layoutActions from '../layout-actions'
export const fetchInitialData = (signal) => {
    return async (dispatch, getState) => {
        try {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().customersPage_reducer
            dispatch(isLoading(true))
            const customers = await fetchCustomers({
                search,
                order,
                nextTo,
                numOfResults,
                signal,
            })
            if (customers.length) {
                dispatch({
                    type: 'customersPage-customers',
                    data: customers,
                })
                dispatch({
                    type: 'customersPage-nextTo',
                    data: customers[customers.length - 1].CreatedDate,
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

export const getCustomers = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().customersPage_reducer
            try {
                const customers = await fetchCustomers({
                    search,
                    order,
                    nextTo,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'customersPage-customers',
                        data: getState()
                            .customersPage_reducer.customers.slice()
                            .concat(customers),
                    })
                } else {
                    dispatch({
                        type: 'customersPage-customers',
                        data: customers,
                    })
                }

                if (customers.length) {
                    dispatch({
                        type: 'customersPage-nextTo',
                        data: customers[customers.length - 1].CreatedDate,
                    })
                }
                resolve(customers)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const fetchCustomers = ({
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
                `${baseURI}/api/Customer?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.Customers)
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
            let customers = await dispatch(getCustomers(undefined, true))
            if (
                customers.length < getState().customersPage_reducer.numOfResults
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
        dispatch({ type: 'customersPage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'customersPage-isLoadingMore', data: isLoading })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'customersPage-showLoadingMoreBtn', data: isLoading })
    }
}

export const isLoadingCustomers = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'customersPage-isLoadingCustomers', data: isLoading })
    }
}
