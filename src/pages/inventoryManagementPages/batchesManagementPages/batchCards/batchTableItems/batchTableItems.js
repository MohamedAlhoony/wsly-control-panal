import React from "react";
import { Table } from "semantic-ui-react";
import { dateFormat } from "../../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const CardsTable = (props) => {
  const getTableItems = (props) => {
    if (!props.cards.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={12}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.cards.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.Id}</Table.Cell>
          <Table.Cell>{card.Batch}</Table.Cell>
          <Table.Cell>
            <Link to={`/brands/${card.Denomination.Brand.Id}`}>
              {card.Denomination.Brand.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/denominations/${card.Denomination.Id}`}>
              {card.Denomination.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{card.BuyPrice}</Table.Cell>
          <Table.Cell>{card.IsSold ? "نعم" : "لا"}</Table.Cell>
          <Table.Cell>{card.IsWithdrawn ? "نعم" : "لا"}</Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(card.ExpirationDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>{card.SerialNumber}</Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{card.Provider.Name}</Link>
          </Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(card.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{card.CreatedBy.Name}</Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
