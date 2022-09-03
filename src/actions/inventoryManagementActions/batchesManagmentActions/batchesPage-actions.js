import auth from '../../../auth'
import { baseURI } from '../../../config'
import * as layoutActions from '../../layout-actions'
export const fetchInitialData = (signal) => {
    return async (dispatch, getState) => {
        try {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().batchesPage_reducer
            dispatch(isLoading(true))
            const batches = await fetchBatches({
                search,
                order,
                nextTo,
                numOfResults,
                signal,
            })
            if (batches.length) {
                dispatch({
                    type: 'batchesPage-batches',
                    data: batches,
                })
                dispatch({
                    type: 'batchesPage-nextTo',
                    data: batches[batches.length - 1].Id,
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

export const getBatches = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().batchesPage_reducer
            try {
                const batches = await fetchBatches({
                    search,
                    order,
                    nextTo,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'batchesPage-batches',
                        data: getState()
                            .batchesPage_reducer.batches.slice()
                            .concat(batches),
                    })
                } else {
                    dispatch({
                        type: 'batchesPage-batches',
                        data: batches,
                    })
                }
                if (batches.length) {
                    dispatch({
                        type: 'batchesPage-nextTo',
                        data: batches[batches.length - 1].Id,
                    })
                }
                resolve(batches)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const sendWithDrawBatch = (batchID) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            const response = await fetch(
                `${baseURI}/api/Inventory/Batch/Withdraw?id=${batchID}`,
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

export const withDrawBatch = (batchID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            await sendWithDrawBatch(batchID)
            dispatch(
                layoutActions.alertModal({
                    show: true,
                })
            )
            if (!getState().batchesPage_reducer.showLoadingMoreBtn) {
                dispatch(showLoadingMoreBtn(true))
            }
            dispatch({
                type: 'batchesPage-batches',
                data: [],
            })
            dispatch({
                type: 'batchesPage-nextTo',
                data: 0,
            })
            await dispatch(getBatches())
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(isLoading(false))
            dispatch(layoutActions.handleHttpError(error))
        }
    }
}

export const sendConfirmBatch = (batchID) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            const response = await fetch(
                `${baseURI}/api/Inventory/Batch/Confirm?id=${batchID}`,
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

export const confirmBatch = (batchID) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            await sendConfirmBatch(batchID)
            dispatch(
                layoutActions.alertModal({
                    show: true,
                })
            )
            dispatch({
                type: 'batchesPage-batches',
                data: [],
            })
            dispatch({
                type: 'batchesPage-nextTo',
                data: 0,
            })
            await dispatch(getBatches())
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(layoutActions.handleHttpError(error))
            dispatch(isLoading(false))
        }
    }
}

export const fetchBatches = ({
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
                `${baseURI}/api/Inventory/Batch?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.Batches)
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
            let batches = await dispatch(getBatches(undefined, true))
            if (batches.length < getState().batchesPage_reducer.numOfResults) {
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
        dispatch({ type: 'batchesPage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'batchesPage-isLoadingMore', data: isLoading })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'batchesPage-showLoadingMoreBtn', data: isLoading })
    }
}

export const isLoadingBatches = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'batchesPage-isLoadingBatches', data: isLoading })
    }
}
