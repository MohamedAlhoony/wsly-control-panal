import React from 'react'
import { Menu, Checkbox, Button } from 'semantic-ui-react'
const TopMenu = (props) => {
    return (
        <Menu stackable pointing>
            <Menu.Item>
                <Checkbox
                    onChange={() => props.handleStateChange(!props.isActive)}
                    checked={props.isActive ? true : false}
                    toggle
                    label={props.isActive ? 'الحساب مفعل' : 'الحساب غير مفعل'}
                />
            </Menu.Item>
            <Menu.Item>
                <Button
                    onClick={props.handleResetPassword}
                    icon={'key'}
                    content={'إعادة تعيين كلمة سر الزبون'}
                />
            </Menu.Item>
        </Menu>
    )
}

export default TopMenu
