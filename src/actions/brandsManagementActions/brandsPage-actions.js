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
            } = getState().brandsPage_reducer
            dispatch(isLoading(true))
            const brands = await fetchBrands({
                search,
                order,
                nextTo,
                numOfResults,
            })
            if (brands.length) {
                dispatch({
                    type: 'brandsPage-brands',
                    data: brands,
                })
                dispatch({
                    type: 'brandsPage-nextTo',
                    data: brands[brands.length - 1].Id,
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

export const getBrands = (signal, isLoadMore) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const {
                search,
                order,
                nextTo,
                numOfResults,
            } = getState().brandsPage_reducer
            try {
                const brands = await fetchBrands({
                    search,
                    order,
                    nextTo,
                    numOfResults,
                    signal,
                })
                if (isLoadMore) {
                    dispatch({
                        type: 'brandsPage-brands',
                        data: getState()
                            .brandsPage_reducer.brands.slice()
                            .concat(brands),
                    })
                } else {
                    dispatch({
                        type: 'brandsPage-brands',
                        data: brands,
                    })
                }

                if (brands.length) {
                    dispatch({
                        type: 'brandsPage-nextTo',
                        data: brands[brands.length - 1].Id,
                    })
                }
                resolve(brands)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const fetchBrands = ({
    search,
    nextTo,
    order,
    numOfResults,
    signal,
    categoryID,
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
                `${baseURI}/api/Brand?category=${categoryID}&search=${search.trim()}&nextTo=${nextTo}&order=${order}&numOfResults=${numOfResults}`,
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
            let brands = await dispatch(getBrands(undefined, true))
            if (brands.length < getState().brandsPage_reducer.numOfResults) {
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
        dispatch({ type: 'brandsPage-isLoading', data: isLoading })
    }
}
export const isLoadingMore = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'brandsPage-isLoadingMore', data: isLoading })
    }
}
export const showLoadingMoreBtn = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'brandsPage-showLoadingMoreBtn', data: isLoading })
    }
}

export const isLoadingBrands = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'brandsPage-isLoadingBrands', data: isLoading })
    }
}
