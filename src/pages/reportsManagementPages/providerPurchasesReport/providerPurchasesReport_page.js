import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/providerPurchasesReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import ProviderPurchasesReportTableItems from "./providerPurchasesReportItems/providerPurchasesReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
import moment from "moment";
const ProviderPurchasesReport_Page = (props) => {
  useEffect(() => {
    return () => {
      props.dispatch({ type: "reset-providerPurchasesReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.providerPurchasesSortBy(column));
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
  const updateProviderPurchasesReport = () => {
    props.dispatch(actions.updateProviderPurchasesReport());
  };
  const exportProviderPurchasesReport = (type) => {
    props.dispatch(actions.exportProviderPurchasesReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        isExportBtnLoading={props.isExportBtnLoading}
        exportProviderPurchasesReport={exportProviderPurchasesReport}
        updateProviderPurchasesReport={updateProviderPurchasesReport}
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <ProviderPurchasesReportTableItems
            providerPurchases={props.providerPurchases}
          />
        </Table.Body>
        {!props.providerPurchases.length && (
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

export default connect(({ providerPurchasesReportPage_reducer }, props) => {
  return {
    isLoading: providerPurchasesReportPage_reducer.isLoading,
    isExportBtnLoading: providerPurchasesReportPage_reducer.isExportBtnLoading,
    providerPurchases: providerPurchasesReportPage_reducer.providerPurchases,
    tableSorting: providerPurchasesReportPage_reducer.tableSorting,
    dateFilter: providerPurchasesReportPage_reducer.dateFilter,
  };
})(ProviderPurchasesReport_Page);
