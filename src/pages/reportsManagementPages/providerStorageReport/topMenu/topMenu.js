import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Dropdown
          loading={props.isExportBtnLoading}
          text="تحميل"
          icon="download"
          floating
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              content={"CSV"}
              onClick={() => props.exportProviderStorageReport(1)}
            />
            <Dropdown.Item
              content={"Excel"}
              onClick={() => props.exportProviderStorageReport(2)}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
