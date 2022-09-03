import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/salesReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import SalesReportTableItems from "./salesReportItems/salesReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import moment from "moment";
const SalesReport_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({ type: "reset-salesReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.salesSortBy(column));
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
  const updateSalesReport = () => {
    props.dispatch(actions.updateSalesReport());
  };
  const exportSalesReport = (type) => {
    props.dispatch(actions.exportSalesReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        isExportBtnLoading={props.isExportBtnLoading}
        exportSalesReport={exportSalesReport}
        updateSalesReport={updateSalesReport}
        handleDatePickerChange={handleDatePickerChange}
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
                props.tableSorting.column === "TotalNumberOfSales"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("TotalNumberOfSales");
              }}
            >
              إجمالي البطاقات المباعة
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "AVGBuyingPrice"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("AVGBuyingPrice");
              }}
            >
              متوسط سعر الشراء
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
                props.tableSorting.column === "BuyCurrency"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("BuyCurrency");
              }}
            >
              عملة الشراء
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
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "Profit"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Profit");
              }}
            >
              هامش الربح
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "TotalSales"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("TotalSales");
              }}
            >
              المجموع
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <SalesReportTableItems sales={props.sales} />
        </Table.Body>
        {!props.sales.length && (
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

export default connect(({ salesReportPage_reducer }, props) => {
  return {
    isLoading: salesReportPage_reducer.isLoading,
    isExportBtnLoading: salesReportPage_reducer.isExportBtnLoading,
    sales: salesReportPage_reducer.sales,
    tableSorting: salesReportPage_reducer.tableSorting,
    dateFilter: salesReportPage_reducer.dateFilter,
  };
})(SalesReport_Page);
