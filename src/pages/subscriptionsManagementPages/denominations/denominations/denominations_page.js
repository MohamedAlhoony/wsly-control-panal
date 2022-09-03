import React, { useEffect } from "react";
import * as actions from "../../../../actions/subscriptionsManagementActions/denominations/denominationsPage-actions";
import { connect } from "react-redux";
import {
  Segment,
  Button,
  Table,
  Loader,
  Step,
  Icon,
  Label,
} from "semantic-ui-react";
import debounce from "lodash.debounce";
import PageContainer from "../../../../components/pageContainer/pageContainer";
import TopMenu from "./topMenu/topMenu";
import ConfirmDialog from "../../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../../actions/layout-actions";
import DenominationsTableItems from "./denominationsTableItems/subscriptionsTableItems";
import { Link } from "react-router-dom";
let wrappingFunction = null;
const _debouncedFetching = debounce(() => {
  wrappingFunction();
}, 700);
const Denominations_Page = (props) => {
  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;
    props.dispatch(actions.fetchInitialData(props.subscriptionID, signal));
    return () => {
      props.dispatch({
        type: "reset-subscriptionDenominationsPage_reducer",
      });
      controller.abort();
    };
  }, []);
  const handleTopMenuChange = (value, meta) => {
    props.dispatch({
      type: `subscriptionDenominationsPage-${meta.id}`,
      data: value,
    });
    if (meta.id === "search") {
      if (value.trim() !== props.search.trim()) {
        _debouncedFetching();
      }
    } else {
      wrappingFunction();
    }
  };

  wrappingFunction = () => {
    props.dispatch(actions.isLoadingDenominations(true));
    if (!props.showLoadingMoreBtn) {
      props.dispatch(actions.showLoadingMoreBtn(true));
    }
    props.dispatch({
      type: "subscriptionDenominationsPage-nextTo",
      data: 0,
    });
    props
      .dispatch(actions.getDenominations(props.subscriptionID))
      .then(() => {
        props.dispatch(actions.isLoadingDenominations(false));
      })
      .catch(() => {
        props.dispatch(actions.isLoadingDenominations(false));
      });
  };
  const confimredRemoveDenomination = (denomination) => {
    props.dispatch(
      actions.removeDenomination(props.subscriptionID, denomination)
    );
  };
  let confirmedFunction;
  const removeDenomination = (denomination) => {
    confirmedFunction = () => {
      confimredRemoveDenomination(denomination);
    };
    props.dispatch(
      confirmDialog({
        show: true,
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <Label
        icon={"linkify"}
        content={props.subscriptionName}
        as={Link}
        to={`/subscriptions/${props.subscriptionID}`}
        tag
        size={"big"}
      />
      <ConfirmDialog onConfirm={(_) => confirmedFunction(_)} />
      <TopMenu
        subscriptionID={props.subscriptionID}
        isLoadingDenominations={props.isLoadingDenominations}
        handleTopMenuChange={handleTopMenuChange}
        search={props.search}
        order={props.order}
      />
      {!props.isLoadingDenominations ? (
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>العلامة التجارية</Table.HeaderCell>
              <Table.HeaderCell>الفئة</Table.HeaderCell>
              <Table.HeaderCell>السعر</Table.HeaderCell>
              <Table.HeaderCell>السعر النسبي</Table.HeaderCell>
              <Table.HeaderCell>الحالة</Table.HeaderCell>
              <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
              <Table.HeaderCell>أضيف من قبل</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <DenominationsTableItems
              removeDenomination={removeDenomination}
              subscriptionID={props.subscriptionID}
              denominations={props.denominations}
            />
          </Table.Body>
          {props.denominations.length > props.numOfResults - 1 ||
          props.denominations.length === 0 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={9}>
                  {props.denominations.length > props.numOfResults - 1 &&
                  props.showLoadingMoreBtn ? (
                    !props.isLoadingDenominations ? (
                      <Button
                        fluid
                        loading={props.isLoadingMore}
                        disabled={props.isLoadingMore ? true : false}
                        onClick={() => {
                          props.dispatch(
                            actions.loadMore(props.subscriptionID)
                          );
                        }}
                      >
                        {!props.isLoadingMore ? "عرض المزيد" : <Loader />}
                      </Button>
                    ) : null
                  ) : props.denominations.length !== 0 ? (
                    <span style={{ color: "GrayText" }}>
                      &lt;&lt;&lt; نهاية &gt;&gt;&gt;
                    </span>
                  ) : !props.isLoadingDenominations ? (
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

export default connect(({ subscriptionDenominationsPage_reducer }, props) => {
  return {
    subscriptionName:
      subscriptionDenominationsPage_reducer.subscriptionDetails?.Name,
    order: subscriptionDenominationsPage_reducer.order,
    search: subscriptionDenominationsPage_reducer.search,
    denominations: subscriptionDenominationsPage_reducer.denominations,
    showLoadingMoreBtn:
      subscriptionDenominationsPage_reducer.showLoadingMoreBtn,
    isLoading: subscriptionDenominationsPage_reducer.isLoading,
    isLoadingMore: subscriptionDenominationsPage_reducer.isLoadingMore,
    isLoadingDenominations:
      subscriptionDenominationsPage_reducer.isLoadingDenominations,
    numOfResults: subscriptionDenominationsPage_reducer.numOfResults,
    subscriptionID: props.match.params.subscriptionID,
  };
})(Denominations_Page);
