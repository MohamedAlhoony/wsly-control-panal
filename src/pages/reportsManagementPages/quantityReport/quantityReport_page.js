import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/quantityReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import QuantityReportTableItems from "./quantityReportItems/quantityReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
const QuantityReport_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-quantityReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.quantitySortBy(column));
  };

  const exportQuantityReport = (type) => {
    props.dispatch(actions.exportQuantityReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        isExportBtnLoading={props.isExportBtnLoading}
        exportQuantityReport={exportQuantityReport}
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
                props.tableSorting.column === "Quantity"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Quantity");
              }}
            >
              الكمية
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "MinimumQuantityLimit"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("MinimumQuantityLimit");
              }}
            >
              الحد الأدنى للكمية
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "MaximumQuantityLimit"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("MaximumQuantityLimit");
              }}
            >
              الحد الأعلى للكمية
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.tableSorting.column === "SupplyLimit"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("SupplyLimit");
              }}
            >
              حد وجوب التوريد
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <QuantityReportTableItems quantityData={props.quantityData} />
        </Table.Body>
        {!props.quantityData.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>لا يوجد نتائج</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(({ quantityReportPage_reducer }, props) => {
  return {
    isLoading: quantityReportPage_reducer.isLoading,
    isExportBtnLoading: quantityReportPage_reducer.isExportBtnLoading,
    quantityData: quantityReportPage_reducer.quantityData,
    tableSorting: quantityReportPage_reducer.tableSorting,
  };
})(QuantityReport_Page);
