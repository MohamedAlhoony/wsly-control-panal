let defaultState = {
    isLoading: false,
    cards: [],
    filteredCards: [],
    search: '',
    isWithdrawButtonVisible: true,
}

const batchCardsPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'batchCardsPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'batchCardsPage-isWithdrawButtonVisible':
            return {
                ...state,
                isWithdrawButtonVisible: action.data,
            }
        case 'batchCardsPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'batchCardsPage-cards':
            return {
                ...state,
                cards: action.data,
            }
        case 'batchCardsPage-filteredCards':
            return {
                ...state,
                filteredCards: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default batchCardsPage_reducer
