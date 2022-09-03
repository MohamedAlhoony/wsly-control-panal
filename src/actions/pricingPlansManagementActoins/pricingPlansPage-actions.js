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
            } = getState().pricingPlansPage_reducer
            dispatch(isLoading(true))
            const pricingPlans = await fetchPricingPlans({
                search,
                order,
                nextTo,
                numOfResults,
                signal,
            })
            if (pricingPlans.length) {
                dispatch({
                    type: 'pricingPlansPage-pricingPlans',
                    data: pricingPlans,
                })
                dispatch({
                    type: 'pricingPlansPage-nextTo',
                    data: pricingPlans[pricingPlans.length - 1].Id,
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

export const getPricingPlans = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().pricingPlansPage_reducer
            try {
                const pricingPlans = await fetchPricingPlans({
                    search,
                    order,
                    nextTo,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'pricingPlansPage-pricingPlans',
                        data: getState()
                            .pricingPlansPage_reducer.pricingPlans.slice()
                            .concat(pricingPlans),
                    })
                } else {
                    dispatch({
                        type: 'pricingPlansPage-pricingPlans',
                        data: pricingPlans,
                    })
                }

                if (pricingPlans.length) {
                    dispatch({
                        type: 'pricingPlansPage-nextTo',
                        data: pricingPlans[pricingPlans.length - 1].Id,
                    })
                }
                resolve(pricingPlans)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const fetchPricingPlans = ({
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
                `${baseURI}/api/PricingPlan?search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.PricingPlans)
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
            let pricingPlans = await dispatch(getPricingPlans(undefined, true))
            if (
                pricingPlans.length <
                getState().pricingPlansPage_reducer.numOfResults
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
        dispatch({ type: 'pricingPlansPage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'pricingPlansPage-isLoadingMore', data: isLoading })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'pricingPlansPage-showLoadingMoreBtn',
            data: isLoading,
        })
    }
}

export const isLoadingPricingPlans = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'pricingPlansPage-isLoadingPricingPlans',
            data: isLoading,
        })
    }
}

const sendRemovePricingPlan = (planID) => {
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
                `${baseURI}/api/PricingPlan/Delete?Id=${planID}`,
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

export const removePricingPlan = (plan) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            await sendRemovePricingPlan(plan.Id)
            dispatch(
                layoutActions.alertModal({
                    show: true,
                    body: `تمت عملية حذف خطة التسعير "${plan.Name}" بنجاح`,
                })
            )
            if (!getState().pricingPlansPage_reducer.showLoadingMoreBtn) {
                dispatch(showLoadingMoreBtn(true))
            }
            dispatch({
                type: 'pricingPlansPage-pricingPlans',
                data: [],
            })
            dispatch({
                type: 'pricingPlansPage-nextTo',
                data: 0,
            })
            await dispatch(getPricingPlans())
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(layoutActions.handleHttpError(error))
            dispatch(isLoading(false))
        }
    }
}

export const sendExecutePricingPlan = (planID) => {
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
                `${baseURI}/api/PricingPlan/Execute?Id=${planID}`,
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

export const executePricingPlan = (plan) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            await sendExecutePricingPlan(plan.Id)
            dispatch(
                layoutActions.alertModal({
                    show: true,
                    body: `تمت عملية تنفيذ خطة التسعير "${plan.Name}" بنجاح`,
                })
            )
            if (!getState().pricingPlansPage_reducer.showLoadingMoreBtn) {
                dispatch(showLoadingMoreBtn(true))
            }
            dispatch({
                type: 'pricingPlansPage-pricingPlans',
                data: [],
            })
            dispatch({
                type: 'pricingPlansPage-nextTo',
                data: 0,
            })
            await dispatch(getPricingPlans())
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(layoutActions.handleHttpError(error))
            dispatch(isLoading(false))
        }
    }
}
