import React from "react";
import { Menu, Button, Dropdown, Input } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Input
          value={props.voucher}
          onChange={(event) => props.handleVoucherChange(event.target.value)}
          placeholder={"الرقم السري أو التسلسلي"}
        />
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={props.updateVoucherReport}
          disabled={props.voucher === "" ? true : false}
          content={"عرض"}
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          loading={props.isExportBtnLoading}
          disabled={
            props.voucher === "" || props.isExportBtnLoading ? true : false
          }
          text="تحميل"
          icon="download"
          floating
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.exportVoucherReport(1)}>
              CSV
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.exportVoucherReport(2)}
              content={"Excel"}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
