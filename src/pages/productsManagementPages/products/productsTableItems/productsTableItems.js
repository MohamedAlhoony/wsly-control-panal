import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.products.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={7}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.products.map((product, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{product.Id}</Table.Cell>
          <Table.Cell>{product.Name}</Table.Cell>
          <Table.Cell>{product.IsAvailable ? "نعم" : "لا"}</Table.Cell>
          <Table.Cell>
            {product.Description === "" ? "_ _" : product.Description}
          </Table.Cell>
          <Table.Cell>
            <strong>{product.Price}</strong> دينار ليبي
          </Table.Cell>
          <Table.Cell>
            <Link
              to={`/stores/${props.storeId}/categories/${props.categoryId}/products/${product.Id}/preferences`}
            >
              التفضيلات ({product.preferences.length})
            </Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  text={"تعديل"}
                  icon={"edit"}
                  as={Link}
                  to={`./products/${product.Id}/update`}
                />
                {/* <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => props.handleDeleteCustomer(product)}
                  text={"حذف"}
                  icon={"trash"}
                /> */}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return <>{getTableItems(props)}</>;
};

export default CustomersTable;
