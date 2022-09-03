import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
const TopMenu = (props) => {
    return (
        <Menu stackable>
            <Menu.Item>
                <Button
                    as={'a'}
                    href={`data:text/csv;charset=utf-8,${props.pricingPlanTemplateData}`}
                    download="Template.csv"
                    target="_blank"
                    content={'القالب'}
                    icon={'download'}
                />
            </Menu.Item>
        </Menu>
    )
}

export default TopMenu
