import React from "react";
import { Table } from "semantic-ui-react";
const CardsTable = (props) => {
  const getRowColor = (card) => {
    if (card.Quantity < card.MinimumQuantityLimit) {
      return "red";
    }
    if (card.Quantity <= card.SupplyLimit) {
      return "orange";
    }
    if (
      card.Quantity > card.SupplyLimit &&
      card.Quantity < card.MaximumQuantityLimit
    ) {
      return "green";
    }
    return "black";
  };
  const getTableItems = (props) => {
    return props.quantityData.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.BrandName}</Table.Cell>
          <Table.Cell>{card.DenominationName}</Table.Cell>
          <Table.Cell
            style={{
              color: getRowColor(card),
              fontWeight: "bold",
            }}
          >
            {card.Quantity}
          </Table.Cell>
          <Table.Cell>{card.MinimumQuantityLimit}</Table.Cell>
          <Table.Cell>{card.MaximumQuantityLimit}</Table.Cell>
          <Table.Cell>{card.SupplyLimit}</Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
