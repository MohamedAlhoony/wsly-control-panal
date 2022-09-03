import React from "react";
import { Table, Button, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
const denominationsTable = (props) => {
  const getItemCartButtonConfigs = (item) => {
    const itemIndex = props.getCartItemIndex(item.Denomination.Id);
    if (itemIndex === -1) {
      return { icon: "cart plus" };
    } else {
      return { icon: <Icon name={"trash alternate"} />, color: "red" };
    }
  };
  const getTableItems = (props) => {
    return props.denominations.map((deno, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>
            <Link to={`/brands/${deno.Id}`}>{deno.Name}</Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/denominations/${deno.Denomination.Id}`}>
              {deno.Denomination.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{deno.Denomination.Quantity}</Table.Cell>
          <Table.Cell>{deno.Denomination.MaximumQuantityLimit}</Table.Cell>
          <Table.Cell>{deno.Denomination.MinimumQuantityLimit}</Table.Cell>
          <Table.Cell>{deno.Denomination.SupplyQuantityLimit}</Table.Cell>
          <Table.Cell>{deno.Denomination.NumberOfRequests}</Table.Cell>
          <Table.Cell style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            <Popup
              hideOnScroll
              on={"click"}
              disabled={
                props.getCartItemIndex(deno.Denomination.Id) === -1 &&
                props.cart.length === 10
                  ? false
                  : true
              }
              content={"السلة ممتلئة"}
              trigger={
                <Button
                  onClick={() => props.handleItemCartButtonPress(deno)}
                  {...getItemCartButtonConfigs(deno)}
                />
              }
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default denominationsTable;
