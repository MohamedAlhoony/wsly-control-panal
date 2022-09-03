import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/customerPurchasesReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import CustomerPurchasesReportTableItems from "./customerPurchasesReportItems/customerPurchasesReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import moment from "moment";
const CustomerPurchasesReport_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({ type: "reset-customerPurchasesReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.customerPurchasesSortBy(column));
  };
  const handleUserIDChange = (value) => {
    props.dispatch(actions.changeUserID(value));
  };
  const handleDatePickerChange = (value, meta) => {
    if (
      meta.id === "from" &&
      props.dateFilter.to !== "" &&
      moment(value).isAfter(moment(props.dateFilter.to))
    ) {
      props.dispatch(actions.dateFilter({ to: "" }));
    }
    props.dispatch(actions.dateFilter({ [meta.id]: value }));
  };
  const updateCustomerPurchasesReport = () => {
    props.dispatch(actions.updateCustomerPurchasesReport());
  };
  const exportCustomerPurchasesReport = (type) => {
    props.dispatch(actions.exportCustomerPurchasesReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        userID={props.userID}
        isExportBtnLoading={props.isExportBtnLoading}
        exportCustomerPurchasesReport={exportCustomerPurchasesReport}
        updateCustomerPurchasesReport={updateCustomerPurchasesReport}
        handleDatePickerChange={handleDatePickerChange}
        handleUserIDChange={handleUserIDChange}
        dateFilter={props.dateFilter}
      />
      <Table sortable stackable striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "BrandName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("BrandName");
              }}
            >
              العلامة التجارية
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "DenominationName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("DenominationName");
              }}
            >
              الفئة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SubscriptionName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SubscriptionName");
              }}
            >
              الإشتراك
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "TotalPurchased"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("TotalPurchased");
              }}
            >
              إجمالي المشتريات
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "TotalPaid"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("TotalPaid");
              }}
            >
              إجمالي المدفوع
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "AVGSellingPrice"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("AVGSellingPrice");
              }}
            >
              متوسط سعر البيع
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SellCurrency"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SellCurrency");
              }}
            >
              عملة البيع
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <CustomerPurchasesReportTableItems
            customerPurchases={props.customerPurchases}
          />
        </Table.Body>
        {!props.customerPurchases.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={7}>لا يوجد نتائج</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(({ customerPurchasesReportPage_reducer }, props) => {
  return {
    isLoading: customerPurchasesReportPage_reducer.isLoading,
    isExportBtnLoading: customerPurchasesReportPage_reducer.isExportBtnLoading,
    customerPurchases: customerPurchasesReportPage_reducer.customerPurchases,
    tableSorting: customerPurchasesReportPage_reducer.tableSorting,
    dateFilter: customerPurchasesReportPage_reducer.dateFilter,
    userID: customerPurchasesReportPage_reducer.userID,
  };
})(CustomerPurchasesReport_Page);
