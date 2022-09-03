const defaultState = {
    categoryDetails: null,
    isLoading: false,
}

const categoryDetailsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'categoryDetailsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'categoryDetailsPage-categoryDetails':
            return {
                ...state,
                categoryDetails: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default categoryDetailsPage_reducer
