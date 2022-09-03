import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
const CardsTable = (props) => {
  const getTableItems = (props) => {
    return props.providerTopups.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.Amount}</Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(card.Date).local().format(dateFormat)}
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
