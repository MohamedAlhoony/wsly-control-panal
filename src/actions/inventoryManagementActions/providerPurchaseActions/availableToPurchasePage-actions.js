import auth from '../../../auth'
import { baseURI } from '../../../config'
import * as layoutActions from '../../layout-actions'
export const fetchInitialData = (signal) => {
    return async (dispatch, getState) => {
        try {
            const {
                search,
                filter,
            } = getState().availableToPurchasePage_reducer
            dispatch(isLoading(true))
            const availableItems = await fetchAvailableToPurchase({
                search,
                filter,
                signal,
            })
            if (availableItems.length) {
                dispatch({
                    type: 'availableToPurchasePage-available',
                    data: availableItems,
                })
                dispatch({
                    type: 'availableToPurchasePage-nextTo',
                    data: availableItems[availableItems.length - 1].Id,
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

export const getAvailableToPurchase = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                filter,
                // order,
                // nextTo,
                numOfResults,
            } = getState().availableToPurchasePage_reducer
            try {
                const available = await fetchAvailableToPurchase({
                    search,
                    filter,
                    // order,
                    // nextTo,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'availableToPurchasePage-available',
                        data: getState()
                            .availableToPurchasePage_reducer.available.slice()
                            .concat(available),
                    })
                } else {
                    dispatch({
                        type: 'availableToPurchasePage-available',
                        data: available,
                    })
                }
                if (available.length) {
                    dispatch({
                        type: 'availableToPurchasePage-nextTo',
                        data: available[available.length - 1].Id,
                    })
                }
                resolve(available)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

// export const sendWithDrawBatch = (batchID) => {
//     return new Promise(async (resolve, reject) => {
//         var myHeaders = new Headers()
//         myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
//         myHeaders.append(
//             'Authorization',
//             `Bearer ${auth.userData.access_token}`
//         )
//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             redirect: 'follow',
//         }
//         try {
//             const response = await fetch(
//                 `${baseURI}/api/Inventory/Batch/Withdraw?id=${batchID}`,
//                 requestOptions
//             )
//             const body = JSON.parse(await response.text())
//             if (response.status === 200) {
//                 resolve(body)
//             } else {
//                 reject({ code: body?.errorCode, message: body?.message })
//             }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// export const withDrawBatch = (batchID) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(isLoading(true))
//             await sendWithDrawBatch(batchID)
//             dispatch(
//                 layoutActions.alertModal({
//                     show: true,
//                 })
//             )
//             if (!getState().availableToPurchasePage_reducer.showLoadingMoreBtn) {
//                 dispatch(showLoadingMoreBtn(true))
//             }
//             dispatch({
//                 type: 'batchesPage-batches',
//                 data: [],
//             })
//             dispatch({
//                 type: 'batchesPage-nextTo',
//                 data: 0,
//             })
//             await dispatch(getBatches())
//             dispatch(isLoading(false))
//         } catch (error) {
//             dispatch(isLoading(false))
//             dispatch(layoutActions.handleHttpError(error))
//         }
//     }
// }

// export const sendConfirmBatch = (batchID) => {
//     return new Promise(async (resolve, reject) => {
//         var myHeaders = new Headers()
//         myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
//         myHeaders.append(
//             'Authorization',
//             `Bearer ${auth.userData.access_token}`
//         )
//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             redirect: 'follow',
//         }
//         try {
//             const response = await fetch(
//                 `${baseURI}/api/Inventory/Batch/Confirm?id=${batchID}`,
//                 requestOptions
//             )
//             const body = JSON.parse(await response.text())
//             if (response.status === 200) {
//                 resolve(body)
//             } else {
//                 reject({ code: body?.errorCode, message: body?.message })
//             }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// export const confirmBatch = (batchID) => {
//     return async (dispatch) => {
//         try {
//             dispatch(isLoading(true))
//             await sendConfirmBatch(batchID)
//             dispatch(
//                 layoutActions.alertModal({
//                     show: true,
//                 })
//             )
//             dispatch({
//                 type: 'batchesPage-batches',
//                 data: [],
//             })
//             dispatch({
//                 type: 'batchesPage-nextTo',
//                 data: 0,
//             })
//             await dispatch(getBatches())
//             dispatch(isLoading(false))
//         } catch (error) {
//             dispatch(layoutActions.handleHttpError(error))
//             dispatch(isLoading(false))
//         }
//     }
// }

export const fetchAvailableToPurchase = ({
    search,
    filter,
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
                `${baseURI}/api/Inventory/Denomination/AvailableToPurchase?search=${search.trim()}&filter=${filter}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.Brands)
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
            let availableItems = await dispatch(
                getAvailableToPurchase(undefined, true)
            )
            if (
                availableItems.length <
                getState().availableToPurchasePage_reducer.numOfResults
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
        dispatch({ type: 'availableToPurchasePage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'availableToPurchasePage-isLoadingMore',
            data: isLoading,
        })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'availableToPurchasePage-showLoadingMoreBtn',
            data: isLoading,
        })
    }
}

export const isLoadingAvailable = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'availableToPurchasePage-isLoadingAvailable',
            data: isLoading,
        })
    }
}
