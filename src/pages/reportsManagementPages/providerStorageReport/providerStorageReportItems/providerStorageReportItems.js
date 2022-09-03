import React from "react";
import { Table } from "semantic-ui-react";
const CardsTable = (props) => {
  const getTableItems = (props) => {
    return props.providerStorageData.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.ProviderName}</Table.Cell>
          <Table.Cell>{card.Total}</Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
