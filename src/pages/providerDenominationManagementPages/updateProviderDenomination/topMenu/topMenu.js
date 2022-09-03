import React from "react";
import { Menu, Checkbox, Button } from "semantic-ui-react";
const TopMenu = (props) => {
  return (
    <Menu stackable>
      <Menu.Item>
        <Checkbox
          onChange={() =>
            props.handleIsStockReplaceActiveChange(!props.isStockReplaceActive)
          }
          checked={props.isStockReplaceActive ? true : false}
          toggle
          label={
            !props.isStockReplaceActive
              ? "خاصية التعويض الفوري غير مفعلة"
              : "خاصية التعويض الفوري مفعلة"
          }
        />
      </Menu.Item>
      {/* <Menu.Item>
                <Checkbox
                    onChange={() =>
                        props.handleIsSelectRatePriceChange(
                            !props.isSelectRatePrice
                        )
                    }
                    checked={props.isSelectRatePrice ? true : false}
                    toggle
                    label={
                        !props.isSelectRatePrice
                            ? 'تحديد السعر النسبي'
                            : 'إلغاء تحديد السعر النسبي'
                    }
                />
            </Menu.Item> */}
    </Menu>
  );
};

export default TopMenu;
