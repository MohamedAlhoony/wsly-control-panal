import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.categories.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={4}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.categories.map((category, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{category.Id}</Table.Cell>
          <Table.Cell>{category.Name}</Table.Cell>
          <Table.Cell>
            <Link
              to={`/stores/${props.storeId}/categories/${category.Id}/products`}
            >
              عرض المنتجات ({category.items.length})
            </Link>
          </Table.Cell>
          {/* <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  text={"تعديل"}
                  icon={"edit"}
                  as={Link}
                  to={`/categorys/${category.id}/update`}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => props.handleDeleteCustomer(category)}
                  text={"حذف"}
                  icon={"trash"}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell> */}
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CustomersTable;
