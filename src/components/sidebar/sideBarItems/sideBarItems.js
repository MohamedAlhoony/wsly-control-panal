import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import styles from "./styles.module.css";
const getItems = (props) => {
  return props.items.map((item, key) => {
    return (
      <Menu.Item key={key}>
        <Menu.Header>{item.headerName}</Menu.Header>
        <Menu.Menu>
          {item.items.map((subItem, key) => {
            return (
              <Menu.Item
                as={NavLink}
                className={styles.link}
                activeClassName={styles.activeLink}
                exact
                to={subItem.path}
                onClick={() => {
                  props.hideSideBar();
                }}
                icon={<Icon name={subItem.icon} />}
                key={key}
                name={subItem.name}
              />
            );
          })}
        </Menu.Menu>
      </Menu.Item>
    );
  });
};
const SideBarItems = (props) => {
  return <>{getItems(props)}</>;
};

export default SideBarItems;
