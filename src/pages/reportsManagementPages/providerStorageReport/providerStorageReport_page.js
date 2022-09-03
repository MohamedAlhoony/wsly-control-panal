import React, { useEffect } from "react";
import * as actions from "../../../actions/reportsManagementActions/providerStorageReportPage-actions";
import { connect } from "react-redux";
import PageContainer from "../../../components/pageContainer/pageContainer";
import ProviderStorageReportTableItems from "./providerStorageReportItems/providerStorageReportItems";
import { Table } from "semantic-ui-react";
import TopMenu from "./topMenu/topMenu";
const ProviderStorageReport_Page = (props) => {
  useEffect(() => {
    props.dispatch(actions.fetchInitialData());
    return () => {
      props.dispatch({ type: "reset-providerStorageReportPage_reducer" });
    };
  }, []);
  const sortTable = (column) => {
    props.dispatch(actions.providerStorageSortBy(column));
  };

  const exportProviderStorageReport = (type) => {
    props.dispatch(actions.exportProviderStorageReport(type));
  };
  return (
    <PageContainer loading={props.isLoading}>
      <TopMenu
        isExportBtnLoading={props.isExportBtnLoading}
        exportProviderStorageReport={exportProviderStorageReport}
      />
      <Table sortable stackable striped celled>
        <Table.Header>
          <Table.Row>
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
                props.tableSorting.column === "Total"
                  ? props.tableSorting.direction
                  : null
              }
              onClick={() => {
                sortTable("Total");
              }}
            >
              الكمية المتوفرة (دينار/دولار)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <ProviderStorageReportTableItems
            providerStorageData={props.providerStorageData}
          />
        </Table.Body>
        {!props.providerStorageData.length && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={2}>لا يوجد نتائج</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </PageContainer>
  );
};

export default connect(({ providerStorageReportPage_reducer }, props) => {
  return {
    isLoading: providerStorageReportPage_reducer.isLoading,
    isExportBtnLoading: providerStorageReportPage_reducer.isExportBtnLoading,
    providerStorageData: providerStorageReportPage_reducer.providerStorageData,
    tableSorting: providerStorageReportPage_reducer.tableSorting,
  };
})(ProviderStorageReport_Page);
