import React from "react";
import SemanticDatePicker from "../../../../components/datePicker/datePicker";
import { reportsDateFormat } from "../../../../config";
import moment from "moment";
import { Menu, Button, Dropdown } from "semantic-ui-react";
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
      <Menu.Item>
        <Button
          onClick={props.updateSalesReport}
          disabled={
            props.dateFilter.from === "" || props.dateFilter.to === ""
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
            <Dropdown.Item onClick={() => props.exportSalesReport(1)}>
              CSV
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.exportSalesReport(2)}
              content={"Excel"}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
