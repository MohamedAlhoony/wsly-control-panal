import React, { Fragment } from "react";
import { Table, Dropdown, Icon, Checkbox } from "semantic-ui-react";
import moment from "moment";
import { dateFormat } from "../../../../config";
import { Link } from "react-router-dom";
const CustomersTable = (props) => {
  const getTableItems = (props) => {
    if (!props.prefs.length) {
      return (
        <Table.Row>
          <Table.Cell colSpan={3}>لا يوجد نتائج</Table.Cell>
        </Table.Row>
      );
    }
    return props.prefs.map((pref, prefKey) => {
      return (
        <Fragment key={prefKey}>
          <Table.Row style={{ backgroundColor: "#f9fafb" }}>
            <Table.Cell>{pref.Name}</Table.Cell>
            <Table.Cell>
              <Checkbox
                checked={pref.selected ? true : false}
                onChange={() => props.togglePref(pref.PreferenceID)}
                slider
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
                    slider
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
  return <>{getTableItems(props)}</>;
};

export default CustomersTable;
