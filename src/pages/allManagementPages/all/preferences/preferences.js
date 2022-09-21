import React, { Fragment } from "react";
import {
  Table,
  Dropdown,
  Icon,
  Checkbox,
  Grid,
  Menu,
  Button,
  Form,
  Input,
  Header,
  FormField,
} from "semantic-ui-react";
var isEqual = require("lodash.isequal");
const Preferences = (props) => {
  const getPrefs = (selectedItemPrefs) => {
    return selectedItemPrefs.map((pref, prefKey) => {
      return (
        <Fragment key={prefKey}>
          <Table.Row style={{ backgroundColor: "#f9fafb" }}>
            <Table.Cell>
              <Button
                onClick={() => {
                  props.handlePrefExpandClick(pref.PreferenceID);
                }}
                size="tiny"
                icon={
                  pref.isExpanded ? (
                    <Icon name={"arrow up"} />
                  ) : (
                    <Icon name={"arrow down"} />
                  )
                }
              />
            </Table.Cell>
            <Table.Cell>{pref.Name}</Table.Cell>
            <Table.Cell>
              <Checkbox
                checked={pref.selected ? true : false}
                onChange={() => props.togglePref(pref.PreferenceID)}
              />
            </Table.Cell>
            <Table.Cell>
              الخيار الافتراضي <Icon name="arrow down" />
            </Table.Cell>
            <Table.Cell>
              سعر الاضافة <Icon name="arrow down" />
            </Table.Cell>
          </Table.Row>
          {pref.isExpanded
            ? pref.ChoicList.map((choice, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell>{choice.Name}</Table.Cell>
                    {/* <Table.Cell>{choice.ChoicID}</Table.Cell> */}
                    {/* <Table.Cell>{choice.Price}</Table.Cell> */}
                    <Table.Cell>
                      <Checkbox
                        // readOnly={
                        //   choice.selected && choice.isDefault ? true : false
                        // }
                        disabled={
                          !pref.selected
                            ? true
                            : choice.selected && choice.isDefault
                            ? true
                            : false
                        }
                        onChange={() =>
                          props.toggleChoice(pref.PreferenceID, choice.ChoicID)
                        }
                        checked={choice.selected ? true : false}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        radio
                        disabled={
                          !pref.selected
                            ? true
                            : !choice.selected
                            ? true
                            : false
                        }
                        checked={choice.isDefault ? true : false}
                        onChange={() =>
                          props.toggleChoiceDefault(
                            pref.PreferenceID,
                            choice.ChoicID
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell
                      width={"6rem"}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Form.Field
                        onChange={(e) =>
                          props.handeChoicePriceChange(
                            pref.PreferenceID,
                            choice.ChoicID,
                            e.target.value
                          )
                        }
                        disabled={
                          !pref.selected
                            ? true
                            : !choice.selected
                            ? true
                            : false
                        }
                        style={{ width: "6rem" }}
                        control={Input}
                        type="number"
                        value={choice.Price}
                      />
                      &nbsp; د.ل
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Fragment>
      );
    });
  };

  return (
    <>
      <Grid.Column width={16}>
        <Header
          content={"تفضيلات المنتج" + " " + "(" + props.selectedItem.Name + ")"}
          icon={"edit"}
        />
        <Menu stackable style={{ marginBottom: "0.5rem" }}>
          <Menu.Item position={"right"}>
            <Button
              disabled={!props.isChanged}
              onClick={props.saveClick}
              content={"حفظ"}
              className="primary"
              icon={<Icon name={"save"} />}
            />
          </Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column width={16}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>الاسم</Table.HeaderCell>
              <Table.HeaderCell>اختيار</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{getPrefs(props.selectedItemPrefs)}</Table.Body>
        </Table>
      </Grid.Column>
    </>
  );
};

export default Preferences;
