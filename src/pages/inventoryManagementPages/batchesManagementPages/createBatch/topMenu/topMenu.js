import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { baseURI } from '../../../../../config'
const TopMenu = (props) => {
    return (
        <Menu stackable>
            <Menu.Item>
                <Button
                    disabled={
                        props.provider !== '' && props.denomination !== ''
                            ? false
                            : true
                    }
                    as={'a'}
                    href={`${baseURI}/api/Inventory/Batch/Template?Denomination=${props.denomination}&Provider=${props.provider}`}
                    target="_blank"
                    content={'القالب'}
                    icon={'download'}
                />
            </Menu.Item>
        </Menu>
    )
}

export default TopMenu
