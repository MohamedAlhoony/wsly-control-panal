const defaultState = {
    subscriptionDetails: null,
    isLoading: false,
}

const subscriptionDetailsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'subscriptionDetailsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'subscriptionDetailsPage-subscriptionDetails':
            return {
                ...state,
                subscriptionDetails: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default subscriptionDetailsPage_reducer
