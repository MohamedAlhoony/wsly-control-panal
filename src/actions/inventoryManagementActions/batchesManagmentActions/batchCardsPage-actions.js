import auth from '../../../auth'
import { baseURI } from '../../../config'
import * as layoutActions from '../../layout-actions'
import { sendWithDrawBatch } from './batchesPage-actions'
export const fetchInitialData = (batchID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            await dispatch(getBatchCards(batchID))
            dispatch(setIsWithdrawButtonVisible())
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
export const setIsWithdrawButtonVisible = () => {
    return (dispatch, getState) => {
        const cards = getState().batchCardsPage_reducer.cards
        const areAllCardsWithdrawn = cards.every((card) => card.IsWithdrawn)
        const areAllCardsSold = cards.every((card) => card.IsSold)
        dispatch({
            type: 'batchCardsPage-isWithdrawButtonVisible',
            data: areAllCardsWithdrawn || areAllCardsSold,
        })
    }
}
export const fetchBatchCards = (batchID) => {
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
                `${baseURI}/api/Inventory/Batch/${batchID}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body.Cards)
            } else {
                reject({ code: body?.errorCode, message: body?.message })
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const getBatchCards = (batchID) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const cards = await fetchBatchCards(batchID)
                dispatch({ type: 'batchCardsPage-cards', data: cards })
                dispatch({ type: 'batchCardsPage-filteredCards', data: cards })
                resolve(cards)
            } catch (error) {
                dispatch(layoutActions.handleHttpError(error))
                reject(error)
            }
        })
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'batchCardsPage-isLoading', data: isLoading })
    }
}

export const updateFilteredResult = () => {
    return (dispatch, getState) => {
        const cards = getState().batchCardsPage_reducer.cards
        const search = getState().batchCardsPage_reducer.search
        const filteredCards = cards.filter(
            (card) =>
                card.SerialNumber.indexOf(search) !== -1 ||
                card.Denomination.Brand.Name.toLowerCase().indexOf(search) !==
                    -1 ||
                card.Denomination.Name.toLowerCase().indexOf(search) !== -1 ||
                card.Provider.Name.toLowerCase().indexOf(search) !== -1
        )
        dispatch({ type: 'batchCardsPage-filteredCards', data: filteredCards })
    }
}

export const withdrawBatch = (batchID) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            await sendWithDrawBatch(batchID)
            dispatch(
                layoutActions.alertModal({
                    show: true,
                })
            )
            const cards = await fetchBatchCards(batchID)
            dispatch({ type: 'batchCardsPage-cards', data: cards })
            dispatch(isLoading(false))
            dispatch({ type: 'batchCardsPage-filteredCards', data: cards })
            dispatch({
                type: 'batchCardsPage-isWithdrawButtonVisible',
                data: true,
            })
            dispatch(updateFilteredResult())
        } catch (error) {
            dispatch(isLoading(false))
            dispatch(layoutActions.handleHttpError(error))
        }
    }
}
