import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
const FailedPurchasesTable = (props) => {
  const getFailedPurchasesItems = () => {
    return props.failedPurchases.map((purchase, purchaseKey) => {
      return (
        <Table.Row key={purchaseKey}>
          <Table.Cell>
            <Link to={`/brands/${purchase.Denomination.Barnd.Id}`}>
              {purchase.Denomination.Barnd.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/denominations/${purchase.Denomination.Id}`}>
              {purchase.Denomination.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{purchase.Quantity}</Table.Cell>
        </Table.Row>
      );
    });
  };
  return (
    <Table striped stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>العلامة التجارية</Table.HeaderCell>
          <Table.HeaderCell>الفئة</Table.HeaderCell>
          <Table.HeaderCell>الكمية</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{getFailedPurchasesItems()}</Table.Body>
      {!props.failedPurchases.length && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={3}>لايوجد</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
};

export default FailedPurchasesTable;
