import React from "react";
import { Table } from "semantic-ui-react";
const CardsTable = (props) => {
  const getTableItems = (props) => {
    return props.providerPurchases.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.BrandName}</Table.Cell>
          <Table.Cell>{card.DenominationName}</Table.Cell>
          <Table.Cell>{card.ProviderName}</Table.Cell>
          <Table.Cell>{card.TotalPurchased}</Table.Cell>
          <Table.Cell>{card.TotalPaid}</Table.Cell>
          <Table.Cell>{card.AVGBuyingPrice}</Table.Cell>
          <Table.Cell>{card.BuyCurrency}</Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
