import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
const CardsTable = (props) => {
  const getTableItems = (props) => {
    return props.voucherData.map((card, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{card.InvoiceId}</Table.Cell>
          <Table.Cell>{card.Batch}</Table.Cell>
          <Table.Cell>{card.BuyerName}</Table.Cell>
          <Table.Cell>{card.BrandName}</Table.Cell>
          <Table.Cell>{card.DenominationName}</Table.Cell>
          <Table.Cell>{card.ProviderName}</Table.Cell>
          <Table.Cell singleLine style={{ fontSize: "0.85rem" }}>
            {card.SerialNumber}
          </Table.Cell>
          <Table.Cell singleLine style={{ fontSize: "0.85rem" }}>
            {card.SecretNumber}
          </Table.Cell>
          <Table.Cell>
            {card.SellingPrice} {card.SellCurrency}
          </Table.Cell>
          {/* <Table.Cell>{card.BuyerId}</Table.Cell> */}
          {/* <Table.Cell>{card.MetaData}</Table.Cell> */}
          <Table.Cell dir={"ltr"}>
            {moment.utc(card.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(card.ExpirationDate).local().format(dateFormat)}
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CardsTable;
