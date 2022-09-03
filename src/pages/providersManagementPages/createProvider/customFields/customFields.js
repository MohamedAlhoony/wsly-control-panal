import React, { useEffect } from "react";
import { Grid, Table, Form, Input, Button } from "semantic-ui-react";
const CustomFields = (props) => {
  const customFieldTemplate = { value: "", errorMsg: "" };
  useEffect(() => {
    props.handleCustomFieldsChange([customFieldTemplate]);
  }, []);
  const handleAddBtnClick = ({ e }) => {
    e.preventDefault();
    let customFieldsArray = props.customFields.slice();
    customFieldsArray.push(customFieldTemplate);
    props.handleCustomFieldsChange(customFieldsArray);
  };
  const handleDeleteBtnClick = ({ index, e }) => {
    e.preventDefault();
    let customFieldsArray = props.customFields.slice();
    customFieldsArray.splice(index, 1);
    props.handleCustomFieldsChange(customFieldsArray);
    if (!customFieldsArray.length) {
      props.handleCustomFieldsChange([customFieldTemplate]);
    }
  };
  const handleInputChange = ({ value, index }) => {
    let customFieldsArray = props.customFields.slice();
    customFieldsArray[index].value = value;
    props.handleCustomFieldsChange(customFieldsArray);
  };
  const getCustomFieldsItems = () => {
    return props.customFields.map((item, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell>
            <Button.Group>
              <Button onClick={(e) => handleAddBtnClick({ e })} icon={"plus"} />
              <Button
                onClick={(e) => handleDeleteBtnClick({ e, index: key })}
                icon={"minus"}
              />
            </Button.Group>
          </Table.Cell>
          <Table.Cell>
            <Form.Field
              onChange={(e) => {
                handleInputChange({
                  value: e.target.value,
                  //   id: "key",
                  index: key,
                });
              }}
              control={Input}
              value={item.value}
            />
          </Table.Cell>
          {/* <Table.Cell>
            <Form.Field
              onChange={(e) => {
                handleInputChange({
                  value: e.target.value,
                  id: "value",
                  index: key,
                });
              }}
              control={Input}
              value={item.value.value}
            />
          </Table.Cell> */}
        </Table.Row>
      );
    });
  };
  return (
    <Table style={{ marginTop: 0 }} stackable striped compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>المفتاح</Table.HeaderCell>
          {/* <Table.HeaderCell>القيمة</Table.HeaderCell> */}
        </Table.Row>
      </Table.Header>
      <Table.Body>{getCustomFieldsItems()}</Table.Body>
    </Table>
  );
};

export default CustomFields;
