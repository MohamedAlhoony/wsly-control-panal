const defaultState = {
    isSideBarOpen: false,
    isRefreshDialogVisible: false,
    alertModal: {
        isSuccess: true,
        show: false,
        reload: false,
        body: '',
        title: '',
        redirectBtnText: '',
        redirectBtnPath: '',
        willGoBack: false,
    },
    confirmDialog: {
        show: false,
        body: 'هل أنت متأكد من رغبتك في الإستمرار؟',
        title: 'تأكيد العملية',
        continueBtnText: 'متابعة',
    },
}

const layout = (state = defaultState, action) => {
    switch (action.type) {
        case 'layout-isRefreshDialogVisible':
            return {
                ...state,
                isRefreshDialogVisible: action.data,
            }
        case 'layout-isSideBarOpen':
            return {
                ...state,
                isSideBarOpen: action.data,
            }
        case 'layout-alertModal':
            return {
                ...state,
                alertModal: {
                    reload: false,
                    isSuccess: true,
                    show: false,
                    body: '',
                    title: '',
                    redirectBtnText: '',
                    redirectBtnPath: '',
                    willGoBack: false,
                    ...action.data,
                },
            }
        case 'layout-confirmDialog':
            return {
                ...state,
                confirmDialog: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default layout
