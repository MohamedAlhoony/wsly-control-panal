import React from "react";
import { Menu, Checkbox } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable pointing>
      <Menu.Item>
        <Checkbox
          onChange={() => props.handleIsAvailableChange(!props.isAvailable)}
          checked={props.isAvailable ? true : false}
          toggle
          label={
            !props.isAvailable ? "غير ظاهرة للمستخدمين" : "ظاهرة للمستخدمين"
          }
        />
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
