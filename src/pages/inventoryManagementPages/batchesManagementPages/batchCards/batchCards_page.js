import React, { useEffect } from "react";
import * as actions from "../../../../actions/inventoryManagementActions/batchesManagmentActions/batchCardsPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../../components/pageContainer/pageContainer";
import BatchTableItems from "./batchTableItems/batchTableItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import ConfirmDialog from "../../../../components/confirmDialog/confirmDialog";
import { confirmDialog } from "../../../../actions/layout-actions";
import debounce from "lodash.debounce";

let updateFilteredResult;
const _updateFilteredResult = debounce((value) => {
  updateFilteredResult(value);
}, 700);
const Batches_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData(props.batchID));
    return () => {
      props.dispatch({ type: "reset-batchCardsPage_reducer" });
    };
  }, []);
  updateFilteredResult = (value) => {
    props.dispatch(actions.updateFilteredResult());
  };
  const confirmedWithdrawBatch = () => {
    props.dispatch(actions.withdrawBatch(props.batchID));
  };
  const withdrawBatch = () => {
    props.dispatch(
      confirmDialog({
        show: true,
        body: "هل أنت متأكد من رغبتك في سحب جميع البطاقات من المخزون؟",
      })
    );
  };
  return (
    <PageContainer loading={props.isLoading}>
      <ConfirmDialog onConfirm={confirmedWithdrawBatch} />
      <TopMenu
        withdrawBatch={withdrawBatch}
        isWithdrawButtonVisible={props.isWithdrawButtonVisible}
        handleSearchChange={(value) => {
          props.dispatch({ type: "batchCardsPage-search", data: value });
          _updateFilteredResult(value);
        }}
        search={props.search}
      />
      <Table stackable striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>معرف البطاقة</Table.HeaderCell>
            <Table.HeaderCell>معرف الدفعة</Table.HeaderCell>
            <Table.HeaderCell>العلامة التجارية</Table.HeaderCell>
            <Table.HeaderCell>الفئة</Table.HeaderCell>
            <Table.HeaderCell>سعر الشراء</Table.HeaderCell>
            <Table.HeaderCell>هل بيع؟</Table.HeaderCell>
            <Table.HeaderCell>هل تم سحبه؟</Table.HeaderCell>
            <Table.HeaderCell>تاريخ انتهاء الصلاحية</Table.HeaderCell>
            <Table.HeaderCell>الرقم التسلسلي</Table.HeaderCell>
            <Table.HeaderCell>المزود</Table.HeaderCell>
            <Table.HeaderCell>تاريخ الإضافة</Table.HeaderCell>
            <Table.HeaderCell>إضيفت من قبل</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <BatchTableItems cards={props.filteredCards} />
        </Table.Body>
      </Table>
    </PageContainer>
  );
};

export default connect(({ batchCardsPage_reducer }, props) => {
  return {
    cards: batchCardsPage_reducer.cards,
    isLoading: batchCardsPage_reducer.isLoading,
    batchID: props.match.params.batchID,
    filteredCards: batchCardsPage_reducer.filteredCards,
    search: batchCardsPage_reducer.search,
    isWithdrawButtonVisible: batchCardsPage_reducer.isWithdrawButtonVisible,
  };
})(Batches_Page);
