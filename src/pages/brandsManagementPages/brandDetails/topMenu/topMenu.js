import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Button
          content={"عرض فئات العلامة التجارية"}
          as={Link}
          to={`/brands/${props.brandID}/denominations`}
        />
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
