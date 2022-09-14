import React from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.choices.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={4}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.choices.map((choice, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{choice.Id}</Table.Cell>
          <Table.Cell>{choice.Name}</Table.Cell>
          <Table.Cell>{choice.isDefault ? "نعم" : "لا"}</Table.Cell>
          <Table.Cell>
            <strong>{choice.Price}</strong>
            &nbsp;دينار ليبي
          </Table.Cell>
          {/* <Table.Cell>
            <Link to={`/stores/${props.storeId}/choices/${choice.CategoryID}`}>
              خيارات التفضيل ({choice.ChoicList.length})
            </Link>
          </Table.Cell> */}
          <Table.Cell width={"1"}>
            <Dropdown icon={<Icon name={"ellipsis horizontal"} fitted />}>
              <Dropdown.Menu direction={"left"}>
                {/* <Dropdown.Item
                  text={"تعديل"}
                  icon={"edit"}
                  as={Link}
                  to={`/choices/${choice.id}/update`}
                /> */}
                {/* <Dropdown.Divider /> */}
                <Dropdown.Item
                  onClick={() => props.setAsDefault(choice)}
                  text={"تعيين كخيار افتراضي"}
                  // icon={"edit"}
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
