export const alertModal = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "layout-alertModal",
      data: changedFields,
    });
  };
};

export const confirmDialog = (changedFields) => {
  return (dispatch, getState) => {
    dispatch({
      type: "layout-confirmDialog",
      data: {
        show: false,
        body: "هل أنت متأكد من رغبتك في الإستمرار؟",
        title: "تأكيد العملية",
        continueBtnText: "متابعة",
      },
    });
    dispatch({
      type: "layout-confirmDialog",
      data: {
        ...getState().layout_reducer.confirmDialog,
        ...changedFields,
      },
    });
  };
};

export const isSideBarOpen = (isOpen) => {
  return (dispatch) => {
    dispatch({ type: "layout-isSideBarOpen", data: isOpen });
  };
};

export const refreshDialogVisible = (isVisible) => {
  return (dispatch) => {
    dispatch({ type: "layout-isRefreshDialogVisible", data: isVisible });
  };
};

export const handleHttpError = (error, options) => {
  return (dispatch, getState) => {
    if (error.message === "The user aborted a request.") {
      return;
    }
    switch (error?.code) {
      case 150:
        dispatch(
          alertModal({
            reload: options?.reload ? true : false,
            show: true,
            isSuccess: false,
            willGoBack: options?.willGoBack ? true : false,
            body: "لايوجد لديك صلاحية لاستخدام هذه الوظيفة!",
          })
        );
        break;
      default:
        dispatch(
          alertModal({
            reload: options?.reload ? true : false,
            show: true,
            isSuccess: false,
            body: error.message,
            // willGoBack: options?.willGoBack ? true : false,
          })
        );
    }
  };
};
