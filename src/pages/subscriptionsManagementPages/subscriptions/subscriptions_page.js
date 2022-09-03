import React, { useEffect } from "react";
import * as actions from "../../../actions/subscriptionsManagementActions/subscriptionsPage-actions";
import { connect } from "react-redux";
import { Segment, Button, Table, Loader, Message } from "semantic-ui-react";
import debounce from "lodash.debounce";
import PageContainer from "../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import SubscriptionsTableItems from "./subscriptionsTableItems/subscriptionsTableItems";
import SubscriptionUpdatePricesModal from "./subscriptionUpdatePricesModal/subscriptionUpdatePricesModal";
import ConfirmDialog from "../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../actions/layout-actions";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const Subscriptions_Page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(signal));
    return () => {
      props.dispatch({ type: "reset-subscriptionsPage_reducer" });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({ type: `subscriptionsPage-${meta.id}`, data: value });

    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingSubscriptions(true));
    props.dispatch({
      type: "subscriptionsPage-nextTo",
      data: 0,
    });
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props
      .dispatch(actions.getSubscriptions())
      .then(() => {
        props.dispatch(actions.isLoadingSubscriptions(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingSubscriptions(false));
      });
  };

  const closeSubscriptionUpdatePricesModal = () => {
    props.dispatch(actions.resetSubscriptionUpdatePricesModalState());
  };

  const handleClickUpdatePricesButton = async (subscription) => {
    props.dispatch(
      actions.subscriptionUpdatePricesModal({ show: true, subscription })
    );
  };
  const handleUpdatePricesInputFieldChange = (value) => {
    props.dispatch(actions.subscriptionUpdatePricesModalInputFieldValue(value));
  };
  const handleUpdatePricesOpTypeChange = (_, { value }) => {
    props.dispatch(actions.subscriptionUpdatePricesModal({ opType: value }));
  };
  const confirmedSubmitSubscriptionPrices = () => {
    props.dispatch(actions.submitSubscriptionPrices());
  };
  const submitSubscriptionPrices = () => {
    if (props.subscriptionUpdatePricesModal.subscription)
      props.dispatch(
        confirmDialog({
          body: [
            <Message key={0} color={"blue"} size={"tiny"}>
              <Message.Header>انتبه!</Message.Header>
              <p>
                أنت على وشك&nbsp;
                {props.subscriptionUpdatePricesModal.opType === 1
                  ? "ضرب"
                  : "قسمة"}
                &nbsp;القيمة&nbsp; "
                {props.subscriptionUpdatePricesModal.rateValueFormInput.value}"
                &nbsp;
                {props.subscriptionUpdatePricesModal.opType === 1
                  ? "في"
                  : "على"}
                &nbsp; كافة الأسعار النسبية للإشتراك (
                {props.subscriptionUpdatePricesModal.subscription.Name}
                ), هل أنت متأكد من إجراء هذا التغيير؟
              </p>
            </Message>,
          ],
          show: true,
        })
      );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={confirmedSubmitSubscriptionPrices} />
      <SubscriptionUpdatePricesModal
        submitSubscriptionPrices={submitSubscriptionPrices}
        handleUpdatePricesOpTypeChange={handleUpdatePricesOpTypeChange}
        handleUpdatePricesInputFieldChange={handleUpdatePricesInputFieldChange}
        closeSubscriptionUpdatePricesModal={closeSubscriptionUpdatePricesModal}
        subscriptionUpdatePricesModal={props.subscriptionUpdatePricesModal}
      />
      <TopMenu
        isLoadingSubscriptions={props.isLoadingSubscriptions}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingSubscriptions ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>المعرف</Table.HeaderCell>
              <Table.HeaderCell>الإسم</Table.HeaderCell>
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <SubscriptionsTableItems
              handleClickUpdatePricesButton={handleClickUpdatePricesButton}
              subscriptions={props.subscriptions}
            />
          </Table.Body>
          {props.subscriptions.length > props.numOfResults - 1 ||
          props.subscriptions.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={6}>
                  {props.subscriptions.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingSubscriptions ? (
                      <Button
                        fluid
                        loading={props.isLoadingMore}
                        disabled={props.isLoadingMore ? true : false}
                        onClick={() => {
                          props.dispatch(actions.loadMore());
                        }}
                      >
                        {!props.isLoadingMore ? "عرض المزيد" : <Loader />}
                      </Button>
                    ) : null
                  ) : props.subscriptions.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingSubscriptions ? (
                    <span>لايوجد نتائج</span>
                  ) : null}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          ) : null}
        </Table>
      ) : (
        <Segment basic loading={true} />
      )}
    </PageContainer>
  );
};

export default connect(({ subscriptionsPage_reducer }) => {
  return {
    order: subscriptionsPage_reducer.order,
    search: subscriptionsPage_reducer.search,
    subscriptions: subscriptionsPage_reducer.subscriptions,
    showLoadingMoreBtn: subscriptionsPage_reducer.showLoadingMoreBtn,
    isLoading: subscriptionsPage_reducer.isLoading,
    isLoadingMore: subscriptionsPage_reducer.isLoadingMore,
    isLoadingSubscriptions: subscriptionsPage_reducer.isLoadingSubscriptions,
    numOfResults: subscriptionsPage_reducer.numOfResults,
    subscriptionUpdatePricesModal:
      subscriptionsPage_reducer.subscriptionUpdatePricesModal,
  };
})(Subscriptions_Page);
