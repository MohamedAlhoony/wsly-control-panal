import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const TopMenu = (props) => {
    return (
        <Menu stackable pointing>
            <Menu.Menu>
                <Menu.Item>
                    <Button
                        content={'عرض فئات الإشتراك'}
                        as={Link}
                        to={`/subscriptions/${props.subscriptionID}/denominations`}
                    />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default TopMenu
