import React from 'react'
import { Menu, Checkbox } from 'semantic-ui-react'
const TopMenu = (props) => {
    return (
        <Menu stackable>
            <Menu.Item>
                <Checkbox
                    onChange={() =>
                        props.handleIsInternalChange(!props.isInternal)
                    }
                    checked={props.isInternal ? true : false}
                    toggle
                    label={
                        props.isInternal
                            ? 'الصنف ظاهر للمدراء'
                            : 'الصنف غير ظاهر للمدراء'
                    }
                />
            </Menu.Item>
            <Menu.Item>
                <Checkbox
                    onChange={() => props.handleIsPublicChange(!props.isPublic)}
                    checked={props.isPublic ? true : false}
                    toggle
                    label={
                        props.isPublic
                            ? 'الصنف ظاهر للزبائن'
                            : 'الصنف غير ظاهر للزبائن'
                    }
                />
            </Menu.Item>
        </Menu>
    )
}

export default TopMenu
