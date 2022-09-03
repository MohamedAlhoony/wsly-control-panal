import React from "react";
import SemanticDatePicker from "../../../../components/datePicker/datePicker";
import { reportsDateFormat } from "../../../../config";
import moment from "moment";
import { Menu, Button, Dropdown, Select } from "semantic-ui-react";
const TopMenu = (props) => {
  const handleDatePickerChange = (value, meta) => {
    props.handleDatePickerChange(
      value ? moment(value).format(reportsDateFormat) : "",
      meta
    );
  };

  return (
    <Menu stackable>
      <Menu.Item
        style={{
          width: "12rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
        fitted={"vertically"}
      >
        <SemanticDatePicker
          value={props.dateFilter.from ? new Date(props.dateFilter.from) : null}
          onChange={(_, data) => {
            handleDatePickerChange(data.value, { id: "from" });
          }}
          placeholder={"من"}
        />
      </Menu.Item>
      <Menu.Item
        style={{
          width: "12rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
        fitted={"vertically"}
      >
        <SemanticDatePicker
          minDate={new Date(props.dateFilter.from)}
          value={props.dateFilter.to ? new Date(props.dateFilter.to) : null}
          onChange={(_, data) => {
            handleDatePickerChange(data.value, { id: "to" });
          }}
          placeholder={"إلى"}
        />
      </Menu.Item>
      <Menu.Item
        style={{
          width: "12rem",
        }}
      >
        <Select
          fluid
          value={props.providerID}
          onChange={(_, value) => props.handleProviderIDChange(value.value)}
          placeholder={"المزود"}
          options={props.providers.map((item) => {
            return {
              text: item.Name,
              value: item.Id,
              key: item.Id,
            };
          })}
        />
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={props.updateProviderTopupsReport}
          disabled={
            props.providerID === "" ||
            props.dateFilter.from === "" ||
            props.dateFilter.to === ""
              ? true
              : false
          }
          content={"عرض"}
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          loading={props.isExportBtnLoading}
          disabled={
            props.dateFilter.from === "" ||
            props.providerID === "" ||
            props.dateFilter.to === "" ||
            props.isExportBtnLoading
              ? true
              : false
          }
          text="تحميل"
          icon="download"
          floating
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.exportProviderTopupsReport(1)}>
              CSV
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.exportProviderTopupsReport(2)}
              content={"Excel"}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
