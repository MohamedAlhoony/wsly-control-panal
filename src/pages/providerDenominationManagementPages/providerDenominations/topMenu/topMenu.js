import React from "react";
import { Menu, Input, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Input
          onChange={(event) => props.handleSearchChange(event.target.value)}
          value={props.search}
          icon="filter"
          placeholder="فلترة..."
        />
      </Menu.Item>
      <Menu.Item position={"right"}>
        <Button
          as={Link}
          to={`/providers/${props.providerID}/denominations/add`}
          className={"primary"}
          content={"فئة"}
          labelPosition={"right"}
          icon={<Icon name={"plus"} />}
        />
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
