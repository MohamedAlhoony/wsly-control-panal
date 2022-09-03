import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ViolationsTable = (props) => {
  const getViolationsItems = () => {
    return props.violations.map((purchase, purchaseKey) => {
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
          <Table.Cell>
            <Link to={`/providers/${purchase.Provider.Id}`}>
              {purchase.Provider.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{purchase.ActualPrice}</Table.Cell>
          <Table.Cell>{purchase.ExpectedPrice}</Table.Cell>
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
          <Table.HeaderCell>المزود</Table.HeaderCell>
          <Table.HeaderCell>السعر</Table.HeaderCell>
          <Table.HeaderCell>السعر المتوقع</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{getViolationsItems()}</Table.Body>
      {!props.violations.length && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={5}>لايوجد</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
};

export default ViolationsTable;
