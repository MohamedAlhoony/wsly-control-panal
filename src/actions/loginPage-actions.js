import auth from '../auth'
export const preSubmitValidation = (cb) => {
    return (dispatch, getState) => {
        let isFormValid = true
        if (getState().loginPage_reducer.email.value === '') {
            dispatch({
                type: 'loginPage-email-errorMsg',
                data: { id: 'email', value: 'يجب تعبئة هذا الحقل' },
            })
            isFormValid = false
        }
        if (getState().loginPage_reducer.password.value === '') {
            dispatch({
                type: 'loginPage-password-errorMsg',
                data: { id: 'password', value: 'يجب تعبئة هذا الحقل' },
            })
            isFormValid = false
        }

        cb(isFormValid)
    }
}

export const postSubmitValidation = (err) => {
    return (dispatch, getState) => {
        // if (err.status !== 200) {

        dispatch({
            type: 'loginPage-generalErrorMsg',
            data: 'error',
        })
        // }
    }
}

export const login = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let credentials = {}
            credentials.email = getState().loginPage_reducer.email.value
            credentials.password = getState().loginPage_reducer.password.value
            if (getState().loginPage_reducer.isFormValid) {
                dispatch(
                    preSubmitValidation((isFormValid) => {
                        if (isFormValid) {
                            if (
                                getState().loginPage_reducer.generalErrorMsg !==
                                ''
                            ) {
                                dispatch({
                                    type: 'loginPage-generalErrorMsg',
                                    data: '',
                                })
                            }
                            dispatch(isLoading(true))
                            auth.login(credentials)
                                .then((response) => {
                                    resolve(response)
                                    dispatch(isLoading(false))
                                })
                                .catch((response) => {
                                    reject()
                                    dispatch(isLoading(false))
                                    dispatch(postSubmitValidation(response))
                                    dispatch({
                                        type: 'loginPage-password-value',
                                        data: { value: '', id: 'password' },
                                    })
                                })
                        }
                    })
                )
            }
        })
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'loginPage-isLoading', value: isLoading })
    }
}
