import React from "react";
import { Menu, Checkbox } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable pointing>
      <Menu.Item>
        <Checkbox
          onChange={() => props.handleIsActiveChange(!props.isActive)}
          checked={props.isActive ? true : false}
          toggle
          label={!props.isActive ? "غير مفعل" : "مفعل"}
        />
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
