import React from "react";
import { Table, Dropdown, Icon, Image } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const DenominationsTable = (props) => {
  const getTableItems = (props) => {
    return props.denominations.map((denomination, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{denomination.Id}</Table.Cell>
          <Table.Cell>
            <Link to={`/denominations/${denomination.Id}`}>
              {denomination.CardName}
            </Link>
          </Table.Cell>
          <Table.Cell>{denomination.MinimumQuantityLimit}</Table.Cell>
          <Table.Cell>{denomination.MaximumQuantityLimit}</Table.Cell>
          <Table.Cell>{denomination.SupplyLimit}</Table.Cell>
          <Table.Cell>
            {denomination.IsAvailable
              ? "ظاهرة للمستخدمين"
              : "غير ظاهرة للمستخدمين"}
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
                  to={`/brands/${props.brandID}/denominations/${denomination.Id}/update`}
                  as={Link}
                  text={"تعديل البيانات"}
                  icon={"edit"}
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

export default DenominationsTable;
