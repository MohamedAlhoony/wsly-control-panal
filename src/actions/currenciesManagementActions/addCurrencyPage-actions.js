import auth from '../../auth'
import { baseURI } from '../../config'
import * as layoutActions from '../layout-actions'
export const changeFormFieldValue = (value, id) => {
    return (dispatch, getState) => {
        dispatch({
            type: `addCurrencyPage-${id}-value`,
            data: { value, id },
        })
        if (getState().addCurrencyPage_reducer.formData[id].errorMsg !== '') {
            dispatch({
                type: `addCurrencyPage-${id}-errorMsg`,
                data: { value: '', id },
            })
        }
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'addCurrencyPage-isLoading', data: isLoading })
    }
}

const sendFormData = (formData) => {
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
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: urlencoded,
        }

        try {
            const response = await fetch(
                `${baseURI}/api/Currency/Add`,
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

export const submitForm = () => {
    return async (dispatch, getState) => {
        try {
            const formData = getState().addCurrencyPage_reducer.formData
            dispatch(isLoading(true))
            await sendFormData(formData)
            dispatch(clearFormFields())
            dispatch(
                layoutActions.alertModal({
                    show: true,
                })
            )
            dispatch(isLoading(false))
        } catch (error) {
            // dispatch(postSubmitValidation(error ? error.errorCode : null))
            dispatch(layoutActions.handleHttpError(error))
            dispatch(isLoading(false))
        }
    }
}

const clearFormFields = () => {
    return async (dispatch, getState) => {
        const formData = getState().addCurrencyPage_reducer.formData
        for (let key in formData) {
            dispatch({
                type: `addCurrencyPage-${key}-value`,
                data: { value: '', id: key },
            })
        }
    }
}

export const preSubmitValidation = (cb) => {
    return (dispatch, getState) => {
        const formData = getState().addCurrencyPage_reducer.formData
        let isFormValid = true

        if (formData.name.value !== '' && formData.name.value.length < 4) {
            isFormValid = false
            dispatch({
                type: `addCurrencyPage-name-errorMsg`,
                data: {
                    value: 'الإسم لايجب أن يكون أقل من 4 أحرف',
                    id: 'name',
                },
            })
        }

        if (formData.nameEn.value !== '' && formData.nameEn.value.length < 4) {
            isFormValid = false
            dispatch({
                type: `addCurrencyPage-nameEn-errorMsg`,
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
                    type: `addCurrencyPage-${key}-errorMsg`,
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
