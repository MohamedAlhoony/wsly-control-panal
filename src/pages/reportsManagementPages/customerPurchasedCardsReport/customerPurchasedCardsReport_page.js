import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/customerPurchasedCardsReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import CustomerPurchasedCardsReportTableItems from "./customerPurchasedCardsReportItems/customerPurchasedCardsReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import moment from "moment";
const CustomerPurchasedCardsReport_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({
        type: "reset-customerPurchasedCardsReportPage_reducer",
      });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.customerPurchasedCardsSortBy(column));
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
  const updateCustomerPurchasedCardsReport = () => {
    props.dispatch(actions.updateCustomerPurchasedCardsReport());
  };
  const exportCustomerPurchasedCardsReport = (type) => {
    props.dispatch(actions.exportCustomerPurchasedCardsReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        userID={props.userID}
        isExportBtnLoading={props.isExportBtnLoading}
        exportCustomerPurchasedCardsReport={exportCustomerPurchasedCardsReport}
        updateCustomerPurchasedCardsReport={updateCustomerPurchasedCardsReport}
        handleDatePickerChange={handleDatePickerChange}
        handleUserIDChange={handleUserIDChange}
        dateFilter={props.dateFilter}
      />
      <Table sortable stackable striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "InvoiceId"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("InvoiceId");
              }}
            >
              معرف الفاتورة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Batch"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Batch");
              }}
            >
              معرف الدفعة
            </Table.HeaderCell>
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
                props.tableSorting.column === "ProviderName"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("ProviderName");
              }}
            >
              المزود
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SellingPrice"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SellingPrice");
              }}
            >
              سعر البيع
            </Table.HeaderCell>
            {/* <Table.HeaderCell
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
            </Table.HeaderCell> */}
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "MetaData"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("MetaData");
              }}
            >
              بيانات خاصة بالمزود
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "CreatedDate"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("CreatedDate");
              }}
            >
              تاريخ الإنشاء
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "ExpirationDate"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("ExpirationDate");
              }}
            >
              تاريخ انتهاء الصلاحية
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <CustomerPurchasedCardsReportTableItems
            customerPurchasedCards={props.customerPurchasedCards}
          />
        </Table.Body>
        {!props.customerPurchasedCards.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={10}>لا يوجد نتائج</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(
  ({ customerPurchasedCardsReportPage_reducer }, props) => {
    return {
      isLoading: customerPurchasedCardsReportPage_reducer.isLoading,
      isExportBtnLoading:
        customerPurchasedCardsReportPage_reducer.isExportBtnLoading,
      customerPurchasedCards:
        customerPurchasedCardsReportPage_reducer.customerPurchasedCards,
      tableSorting: customerPurchasedCardsReportPage_reducer.tableSorting,
      dateFilter: customerPurchasedCardsReportPage_reducer.dateFilter,
      userID: customerPurchasedCardsReportPage_reducer.userID,
    };
  }
)(CustomerPurchasedCardsReport_Page);
