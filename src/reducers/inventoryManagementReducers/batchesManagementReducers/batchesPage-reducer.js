let defaultState = {
    isLoading: false,
    isLoadingMore: false,
    isLoadingBatches: false,
    showLoadingMoreBtn: true,
    search: '',
    nextTo: 0,
    order: true,
    numOfResults: 10,
    batches: [],
}

const batchesPage_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'batchesPage-batches':
            return {
                ...state,
                batches: action.data,
            }
        case 'batchesPage-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'batchesPage-isLoadingMore':
            return {
                ...state,
                isLoadingMore: action.data,
            }
        case 'batchesPage-showLoadingMoreBtn':
            return {
                ...state,
                showLoadingMoreBtn: action.data,
            }
        case 'batchesPage-isLoadingBatches':
            return {
                ...state,
                isLoadingBatches: action.data,
            }
        case 'batchesPage-search':
            return {
                ...state,
                search: action.data,
            }
        case 'batchesPage-nextTo':
            return {
                ...state,
                nextTo: action.data,
            }
        case 'batchesPage-order':
            return {
                ...state,
                order: action.data,
            }
        case 'batchesPage-numOfResults':
            return {
                ...state,
                numOfResults: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default batchesPage_reducer
