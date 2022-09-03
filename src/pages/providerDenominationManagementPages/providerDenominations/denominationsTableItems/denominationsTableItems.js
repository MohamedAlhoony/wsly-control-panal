import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const denominationsTable = (props) => {
  const getTableItems = (props) => {
    return props.denominations.map((denomination, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>
            <Link to={`/brands/${denomination.Brand.Id}`}>
              {denomination.Brand.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link
              to={`/providers/${props.providerID}/denominations/${denomination.Brand.Denomination.Id}`}
            >
              {denomination.Brand.Denomination.Name}
            </Link>
          </Table.Cell>
          <Table.Cell>{denomination.BuyingPrice}</Table.Cell>
          <Table.Cell>
            {denomination.IsStockReplaceActive ? "نعم" : "لا"}
          </Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(denomination.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{denomination.CreatedBy.Name}</Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  to={`/providers/${props.providerID}/denominations/${denomination.Brand.Denomination.Id}/update`}
                  as={Link}
                  text={"تعديل البيانات"}
                  icon={"edit"}
                />
                <Dropdown.Item
                  text={"حذف"}
                  icon={"trash alternate"}
                  onClick={() => {
                    props.removeDenomination(denomination.Brand.Denomination);
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default denominationsTable;
