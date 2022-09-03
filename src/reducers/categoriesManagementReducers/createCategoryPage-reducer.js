let defaultState = {
    isLoading: false,
    formData: {
        name: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإسم',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                maxLength: 49,
                // placeholder: 'الاسم',
            },
        },
        nameEn: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'الإسم باللغة الإنجليزية',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                dir: 'ltr',
                maxLength: 49,
                // placeholder: 'الاسم',
            },
        },
        rank: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'التصنيف',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'number',
                required: true,
                maxLength: 9,
                // placeholder: 'الاسم',
            },
        },
        isInternal: {
            element: 'input',
            value: true,
            label: true,
            labelText: 'هل يعرض للمدراء؟',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                // placeholder: 'الاسم',
            },
        },
        isPublic: {
            element: 'input',
            value: true,
            label: true,
            labelText: 'هل يعرض للزبائن؟',
            errorMsg: '',
            config: {
                autoComplete: 'off',
                type: 'text',
                required: true,
                // placeholder: 'الاسم',
            },
        },
    },
}

const createCategoryPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'createCategoryPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'createCategoryPage-name-value':
        case 'createCategoryPage-nameEn-value':
        case 'createCategoryPage-rank-value':
        case 'createCategoryPage-isInternal-value':
        case 'createCategoryPage-isPublic-value':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.data.id]: {
                        ...state.formData[action.data.id],
                        value: action.data.value,
                    },
                },
            }
        case 'createCategoryPage-name-errorMsg':
        case 'createCategoryPage-nameEn-errorMsg':
        case 'createCategoryPage-rank-errorMsg':
        case 'createCategoryPage-isInternal-errorMsg':
        case 'createCategoryPage-isPublic-errorMsg':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.data.id]: {
                        ...state.formData[action.data.id],
                        errorMsg: action.data.value,
                    },
                },
            }
        default:
            return {
                ...state,
            }
    }
}

export default createCategoryPage_reducer
