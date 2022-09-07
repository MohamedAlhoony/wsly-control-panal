import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.prefs.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={4}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.prefs.map((pref, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{pref.PreferenceID}</Table.Cell>
          <Table.Cell>{pref.Name}</Table.Cell>
          <Table.Cell>
            <Link
              to={`/stores/${props.storeId}/categories/${props.categoryId}/preferences/${pref.PreferenceID}/choices`}
            >
              خيارات التفضيل ({pref.ChoicList.length})
            </Link>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                <Dropdown.Item
                  text={"تعديل"}
                  icon={"edit"}
                  as={Link}
                  to={`/prefs/${pref.id}/update`}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => props.handleDeleteCustomer(pref)}
                  text={"حذف"}
                  icon={"trash"}
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

export default CustomersTable;
