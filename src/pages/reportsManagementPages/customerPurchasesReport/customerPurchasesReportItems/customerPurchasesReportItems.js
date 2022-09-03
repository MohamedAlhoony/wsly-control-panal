import React from "react";
import { Table } from "semantic-ui-react";
const CardsTable = (props) => {
  const getTableItems = (props) => {
    return props.customerPurchases.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.BrandName}</Table.Cell>
          <Table.Cell>{card.DenominationName}</Table.Cell>
          <Table.Cell>{card.SubscriptionName}</Table.Cell>
          <Table.Cell>{card.TotalPurchased}</Table.Cell>
          <Table.Cell>{card.TotalPaid}</Table.Cell>
          <Table.Cell>{card.AVGSellingPrice}</Table.Cell>
          <Table.Cell>{card.SellCurrency}</Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
