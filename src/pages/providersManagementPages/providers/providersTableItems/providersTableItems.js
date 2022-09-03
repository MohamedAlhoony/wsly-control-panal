import React from "react";
import { Table, Dropdown, Icon, Image } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const BrandsTable = (props) => {
  const getTableItems = (props) => {
    return props.providers.map((provider, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{provider.Id}</Table.Cell>
          <Table.Cell>
            <Link to={`/providers/${provider.Id}`}>
              <span>{provider.Name}</span>
            </Link>
          </Table.Cell>
          <Table.Cell>{!provider.IsActive ? "غير مفعل" : "مفعل"}</Table.Cell>
          <Table.Cell>{provider.BalanceNotificationThreshold}</Table.Cell>
          <Table.Cell>{provider.ThresholdViolationTrigger}</Table.Cell>

          <Table.Cell dir={"ltr"}>
            {moment.utc(provider.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{provider.CreatedBy.Name}</Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/providers/${provider.Id}/denominations`}>
              عرض الفئات
            </Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  to={`/providers/${provider.Id}/update`}
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

export default BrandsTable;
