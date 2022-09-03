import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const ManagersTable = (props) => {
  const getTableItems = (props) => {
    return props.managers.map((manager, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>
            <Link to={`/managers/${manager.Id}`}>{manager.Name}</Link>
          </Table.Cell>
          <Table.Cell>{manager.UserName}</Table.Cell>
          <Table.Cell>{manager.PhoneNumber}</Table.Cell>
          <Table.Cell>{manager.IsActive ? "مفعل" : "غير مفعل"}</Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(manager.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  to={`/managers/${manager.Id}/update`}
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

export default ManagersTable;
