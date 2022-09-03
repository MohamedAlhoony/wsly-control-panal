import auth from '../../auth'
import { baseURI } from '../../config'
import * as layoutActions from '../layout-actions'
import { fetchPricingPlanDetails } from './pricingPlanDetailsPage-actions'
const { Parser } = require('json2csv')
export const fetchInitialData = (pricingPlanID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isLoading(true))
            const pricingPlanDetails = await fetchPricingPlanDetails(
                pricingPlanID
            )
            dispatch(placeFormData(pricingPlanDetails))
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

const placeFormData = (pricingPlanDetails) => {
    return async (dispatch) => {
        dispatch(changeFormFieldValue(pricingPlanDetails.Name, 'name'))
        const fields = [
            'Subscription.Name',
            'Brand.Name',
            'Brand.Denomination.Name',
            'Subscription.Id',
            'Brand.Denomination.Id',
            'Price',
            'RatePrice',
            'IsAvailable',
        ]
        const json2csvParser = new Parser({ fields, quote: '' })
        let csv = json2csvParser.parse(pricingPlanDetails.PricingPlanEntries)
        csv = csv.replace('Subscription.Name', 'SubName')
        csv = csv.replace('Brand.Name', 'BrandName')
        csv = csv.replace('Brand.Denomination.Name', 'CardName')
        csv = csv.replace('Subscription.Id', 'Subscription')
        csv = csv.replace('Brand.Denomination.Id', 'Denomination')
        console.log(csv)
        dispatch({
            type: 'updatePricingPlanPage-pricingPlanTemplateData',
            data: csv,
        })
    }
}

export const changeFormFieldValue = (value, id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: `updatePricingPlanPage-${id}-value`,
            data: { value, id },
        })

        if (
            getState().updatePricingPlanPage_reducer.formData[id].errorMsg !==
            ''
        ) {
            dispatch({
                type: `updatePricingPlanPage-${id}-errorMsg`,
                data: { value: '', id: id },
            })
        }
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: 'updatePricingPlanPage-isLoading',
            data: isLoading,
        })
    }
}

const sendFormData = (pricingPlanID, formData) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        myHeaders.append('Content-Type', 'application/json')
        var raw = JSON.stringify({
            Id: pricingPlanID,
            Name: formData.name.value,
            PricingPlanEntries: formData.pricingPlansEntriesFile.value.value,
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: raw,
        }

        try {
            const response = await fetch(
                `${baseURI}/api/PricingPlan/Update`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body)
            } else {
                reject(body)
            }
        } catch (error) {
            reject()
        }
    })
}

export const submitForm = (pricingPlanID, getState) => {
    return async (dispatch) => {
        try {
            const formData = getState().updatePricingPlanPage_reducer.formData
            dispatch(isLoading(true))
            const updatedPricingPlanData = await sendFormData(
                pricingPlanID,
                formData
            )

            dispatch({
                type: 'updatePricingPlanPage-updatedPricingPlanData',
                data: updatedPricingPlanData,
            })
            dispatch(
                layoutActions.alertModal({
                    willGoBack: true,
                    show: true,
                    body: 'تمت عملية تحديث الخطة بنجاح',
                })
            )
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(layoutActions.handleHttpError(error))
            // dispatch(postSubmitValidation(error ? error : null))
            dispatch(isLoading(false))
        }
    }
}

export const preSubmitValidation = (cb) => {
    return (dispatch, getState) => {
        let isFormValid = true
        const formData = getState().updatePricingPlanPage_reducer.formData
        if (formData.name.value !== '' && formData.name.value.length < 2) {
            isFormValid = false
            dispatch({
                type: `updatePricingPlanPage-name-errorMsg`,
                data: { value: 'طول الإسم لايجب أن يقل عن حرفان', id: 'name' },
            })
        }
        for (let key in formData) {
            if (
                (key !== 'pricingPlansEntriesFile' &&
                    formData[key].config.required &&
                    formData[key].value === '') ||
                (key === 'pricingPlansEntriesFile' &&
                    formData[key].config.required &&
                    formData[key].value.value === '')
            ) {
                isFormValid = false
                dispatch({
                    type: `updatePricingPlanPage-${key}-errorMsg`,
                    data: { value: 'يجب تعبئة هذا الحقل', id: key },
                })
            }
        }
        cb(isFormValid)
    }
}

const postSubmitValidation = (error) => {
    return (dispatch, getState) => {
        switch (error.code) {
            default:
                dispatch(
                    layoutActions.alertModal({
                        body: error.message,
                        isSuccess: false,
                        show: true,
                    })
                )
        }
    }
}

export const fetchPricingPlanTemplate = () => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append(
            'Authorization',
            `Bearer ${auth.userData.access_token}`
        )
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            const response = await fetch(
                `${baseURI}/api/PricingPlan/Template`,
                requestOptions
            )
            const body = await response.text()
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
