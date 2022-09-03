import React from "react";
import { Menu, Input, Button } from "semantic-ui-react";
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
      {!props.isWithdrawButtonVisible ? (
        <Menu.Item>
          <Button
            onClick={props.withdrawBatch}
            content={"سحب البطاقات من المخزون"}
          />
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

export default TopMenu;
