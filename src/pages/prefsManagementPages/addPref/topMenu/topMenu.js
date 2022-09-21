import React from "react";
import { Menu, Input, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
const TopMenu = (props) => {
  return (
    <Menu inverted={props.isDarkMode} stackable>
      <Menu.Item position={"left"}>
        <Button
          inverted={props.isDarkMode}
          // as={Link}
          // to={"./preferences/add"}
          onClick={props.handleSubmit}
          content={"ارسال"}
          className="primary"
          // icon={<Icon name={"plus"} />}
        />
      </Menu.Item>
      {/* <Menu.Item>
        <Input
          inverted={props.isDarkMode}
          onChange={(event) => props.handleSearchChange(event.target.value)}
          value={props.search}
          icon="filter"
          placeholder="فلترة..."
        />
      </Menu.Item> */}
    </Menu>
  );
};

export default TopMenu;
