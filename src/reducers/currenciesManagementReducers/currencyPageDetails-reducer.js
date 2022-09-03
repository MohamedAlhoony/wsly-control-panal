const defaultState = {
    exchangeValue: null,
    currencyDetails: null,
    isLoading: false,
}

const currencyDetailsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'currencyDetailsPage-exchangeValue':
            return {
                ...state,
                exchangeValue: action.data,
            }
        case 'currencyDetailsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'currencyDetailsPage-currencyDetails':
            return {
                ...state,
                currencyDetails: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default currencyDetailsPage_reducer
