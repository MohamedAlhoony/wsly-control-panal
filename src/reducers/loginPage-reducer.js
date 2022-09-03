let defaultState = {
    isLoading: false,
    isFormValid: true,
    generalErrorMsg: '',
    email: {
        value: '',
        errorMsg: '',
    },
    password: {
        value: '',
        errorMsg: '',
    },
}

const loginPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'loginPage-isLoading':
            return {
                ...state,
                isLoading: action.value,
            }
        case 'loginPage-password-errorMsg':
        case 'loginPage-email-errorMsg':
            return {
                ...state,
                [action.data.id]: {
                    ...state[action.data.id],
                    errorMsg: action.data.value,
                },
            }
        case 'loginPage-password-value':
        case 'loginPage-email-value':
            return {
                ...state,
                [action.data.id]: {
                    ...state[action.data.id],
                    value: action.data.value,
                },
            }
        case 'loginPage-generalErrorMsg':
            return {
                ...state,
                generalErrorMsg: action.data,
            }

        case 'loginPage-isFormValid':
            return {
                ...state,
                isFormValid: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default loginPage_reducer
