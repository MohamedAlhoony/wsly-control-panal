import auth from '../../auth'
import { baseURI } from '../../config'
import * as layoutActions from '../layout-actions'
import { fetchCurrencyDetails } from './currencyDetailsPage-actions'
import { normalizeFetchedData } from '../../helperFunctions'
export const changeFormFieldValue = (value, id) => {
    return (dispatch, getState) => {
        dispatch({
            type: `updateCurrencyPage-${id}-value`,
            data: { value, id },
        })
        if (
            getState().updateCurrencyPage_reducer.formData[id].errorMsg !== ''
        ) {
            dispatch({
                type: `updateCurrencyPage-${id}-errorMsg`,
                data: { value: '', id: id },
            })
        }
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'updateCurrencyPage-isLoading', data: isLoading })
    }
}

const placeFormData = (currencyDetails) => {
    return (dispatch) => {
        dispatch(changeFormFieldValue(currencyDetails.Name, 'name'))
        dispatch(changeFormFieldValue(currencyDetails.NameEn, 'nameEn'))
        dispatch(changeFormFieldValue(currencyDetails.Code, 'code'))
        dispatch(changeFormFieldValue(currencyDetails.CodeEn, 'codeEn'))
        dispatch(changeFormFieldValue(currencyDetails.Symbol, 'symbol'))
    }
}

export const fetchInitialData = (currencyID) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            const [currencyDetails] = await Promise.all([
                fetchCurrencyDetails(currencyID),
            ])
            dispatch(placeFormData(normalizeFetchedData(currencyDetails)))
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

const sendFormData = (currencyID, formData) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
        var urlencoded = new URLSearchParams()
        urlencoded.append('Name', formData.name.value)
        urlencoded.append('NameEn', formData.nameEn.value)
        urlencoded.append('Symbol', formData.symbol.value)
        urlencoded.append('Code', formData.code.value)
        urlencoded.append('CodeEn', formData.codeEn.value)
        urlencoded.append('Id', currencyID)
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
            body: urlencoded,
        }

        try {
            const response = await fetch(
                `${baseURI}/api/Currency/Update`,
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

export const submitForm = (currencyID) => {
    return async (dispatch, getState) => {
        try {
            const formData = getState().updateCurrencyPage_reducer.formData
            dispatch(isLoading(true))
            await sendFormData(currencyID, formData)
            dispatch(
                layoutActions.alertModal({
                    show: true,
                    willGoBack: true,
                })
            )
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(layoutActions.handleHttpError(error))
            dispatch(isLoading(false))
            // dispatch(postSubmitValidation(error ? error.errorCode : null))
        }
    }
}

export const preSubmitValidation = (cb) => {
    return (dispatch, getState) => {
        const formData = getState().updateCurrencyPage_reducer.formData
        let isFormValid = true

        if (formData.name.value !== '' && formData.name.value.length < 4) {
            isFormValid = false
            dispatch({
                type: `updateCurrencyPage-name-errorMsg`,
                data: {
                    value: 'الإسم لايجب أن يكون أقل من 4 أحرف',
                    id: 'name',
                },
            })
        }

        if (formData.nameEn.value !== '' && formData.nameEn.value.length < 4) {
            isFormValid = false
            dispatch({
                type: `updateCurrencyPage-nameEn-errorMsg`,
                data: {
                    value: 'الإسم لايجب أن يكون أقل من 4 أحرف',
                    id: 'nameEn',
                },
            })
        }

        for (let key in formData) {
            if (formData[key].config.required && formData[key].value === '') {
                isFormValid = false
                dispatch({
                    type: `updateCurrencyPage-${key}-errorMsg`,
                    data: { value: 'يجب تعبئة هذا الحقل', id: key },
                })
            }
        }

        cb(isFormValid)
    }
}

const postSubmitValidation = (errorCode) => {
    return (dispatch) => {
        switch (errorCode) {
            default:
                dispatch(
                    layoutActions.alertModal({
                        isSuccess: false,
                        show: true,
                    })
                )
        }
    }
}
