import React from "react";
import { Table, Form, Input } from "semantic-ui-react";
const CustomFields = (props) => {
  const handleInputChange = ({ value, index }) => {
    let customFieldsArray = props.customFields.slice();
    customFieldsArray[index].value = value;
    props.handleCustomFieldsChange(customFieldsArray);
  };
  const getCustomFieldsItems = () => {
    return props.customFields.map((item, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>{item.key}</Table.Cell>
          <Table.Cell>
            <Form.Field
              onChange={(e) => {
                handleInputChange({
                  value: e.target.value,
                  index: key,
                });
              }}
              control={Input}
              value={item.value}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return (
    <Table style={{ marginTop: 0 }} stackable striped compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>المفتاح</Table.HeaderCell>
          <Table.HeaderCell>القيمة</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{getCustomFieldsItems()}</Table.Body>
      {!props.customFields.length && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>لا يوجد</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
};

export default CustomFields;
