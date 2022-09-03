import auth from '../../auth'
import { baseURI } from '../../config'
import { normalizeFetchedData } from '../../helperFunctions'
import * as layoutActions from '../layout-actions'
export const fetchInitialData = (currencyID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            const [currencyDetails, exchangeValue] = await Promise.all([
                fetchCurrencyDetails(currencyID),
                fetchCurrencyExchangeValue(currencyID),
            ])
            dispatch(currencyDetailsPageExchangeValue(exchangeValue))
            dispatch({
                type: 'currencyDetailsPage-currencyDetails',
                data: normalizeFetchedData(currencyDetails),
            })
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

export const currencyDetailsPageExchangeValue = (exchangeValue) => {
    return (dispatch) => {
        dispatch({
            type: 'currencyDetailsPage-exchangeValue',
            data: exchangeValue,
        })
    }
}

export const fetchCurrencyExchangeValue = (currencyID) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        }
        try {
            const response = await fetch(
                `${baseURI}/api/Currency/ExchangeValue?id=${currencyID}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.ExchangeValue)
            } else {
                reject({ code: body?.errorCode, message: body?.message })
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const fetchCurrencyDetails = (currencyID) => {
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
        }
        try {
            var response = await fetch(
                `${baseURI}/api/Currency/${currencyID}`,
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

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'currencyDetailsPage-isLoading', data: isLoading })
    }
}
