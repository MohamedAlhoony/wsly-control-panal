import React, { Fragment } from "react";
import {
  Table,
  Dropdown,
  Icon,
  Checkbox,
  Grid,
  Menu,
  Button,
  Header,
} from "semantic-ui-react";

const Preferences = (props) => {
  const getPrefs = (selectedItemPrefs) => {
    return selectedItemPrefs.map((pref, prefKey) => {
      return (
        <Fragment key={prefKey}>
          <Table.Row style={{ backgroundColor: "#f9fafb" }}>
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
          </Table.Row>
          {pref.ChoicList.map((choice, key) => {
            return (
              <Table.Row key={key}>
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
                      !pref.selected ? true : !choice.selected ? true : false
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
              </Table.Row>
            );
          })}
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
              <Table.HeaderCell>الاسم</Table.HeaderCell>
              <Table.HeaderCell>اختيار</Table.HeaderCell>
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
