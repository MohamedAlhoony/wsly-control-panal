import auth from '../../auth'
import { baseURI } from '../../config'
import { normalizeFetchedData } from '../../helperFunctions'
import * as layoutActions from '../layout-actions'
export const fetchInitialData = (subscriptionID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            const [subscriptionDetails] = await Promise.all([
                fetchSubscriptionDetails(subscriptionID),
            ])
            dispatch({
                type: 'subscriptionDetailsPage-subscriptionDetails',
                data: normalizeFetchedData(subscriptionDetails),
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

export const fetchSubscriptionDetails = (subscriptionID, signal) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
            signal,
        }
        try {
            const response = await fetch(
                `${baseURI}/api/Subscription/${subscriptionID}`,
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
        dispatch({ type: 'subscriptionDetailsPage-isLoading', data: isLoading })
    }
}
