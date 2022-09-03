import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { dateFormat } from "../../../../config";
import moment from "moment";
import { Link } from "react-router-dom";
const SubscriptionsTable = (props) => {
  const getTableItems = (props) => {
    return props.subscriptions.map((subscription, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{subscription.Id}</Table.Cell>
          <Table.Cell>
            <Link to={`/subscriptions/${subscription.Id}`}>
              {subscription.Name}
            </Link>
          </Table.Cell>
          <Table.Cell dir={"ltr"}>
            {moment.utc(subscription.CreatedDate).local().format(dateFormat)}
          </Table.Cell>
          <Table.Cell>
            <Link to={"#"}>{subscription.CreatedBy.Name}</Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/subscriptions/${subscription.Id}/denominations`}>
              عرض الفئات
            </Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  to={`/subscriptions/${subscription.Id}/update`}
                  as={Link}
                  text={"تعديل البيانات"}
                  icon={"edit"}
                />
                <Dropdown.Item
                  onClick={() =>
                    props.handleClickUpdatePricesButton(subscription)
                  }
                  text={"تحديث الأسعار"}
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

export default SubscriptionsTable;
