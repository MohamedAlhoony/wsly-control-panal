import React from 'react'
import { Menu, Checkbox, Button } from 'semantic-ui-react'
const TopMenu = (props) => {
    return (
        <Menu stackable>
            <Menu.Item>
                <Checkbox
                    onChange={() =>
                        props.handleAvailabilityChange(!props.isAvailable)
                    }
                    checked={props.isAvailable ? true : false}
                    toggle
                    label={
                        props.isAvailable ? 'الفئة متاحة' : 'الفئة غير متاحة'
                    }
                />
            </Menu.Item>
            <Menu.Item>
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
            </Menu.Item>
        </Menu>
    )
}

export default TopMenu
