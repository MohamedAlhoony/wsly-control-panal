import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Button
          content={"عرض العلامات التجارية للصنف"}
          as={Link}
          to={`/categories/${props.categoryID}/brands`}
        />
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
