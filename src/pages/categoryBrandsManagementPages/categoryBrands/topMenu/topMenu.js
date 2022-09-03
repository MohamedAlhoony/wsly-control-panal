import React from 'react'
import { Menu, Input, Button, Icon, Form } from 'semantic-ui-react'
const TopMenu = (props) => {
    return (
        <Menu stackable pointing>
            <Menu.Menu>
                <Menu.Item>
                    <Input
                        onChange={(event) =>
                            props.handleTopMenuChange(event.target.value, {
                                id: 'search',
                            })
                        }
                        value={props.search}
                        icon="search"
                        placeholder="بحث..."
                    />
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu>
                <Menu.Item>
                    <Form.Checkbox
                        onChange={() =>
                            props.handleTopMenuChange(!props.order, {
                                id: 'order',
                            })
                        }
                        label={props.order ? 'تنازلي' : 'تصاعدي'}
                        checked={!props.order}
                        style={{ padding: '0 1rem' }}
                        slider
                    />
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position={'right'}>
                <Menu.Item>
                    <Button
                        onClick={props.handleAddBrandToCategoryButtonClick}
                        className={'primary'}
                        content={'علامة تجارية'}
                        labelPosition={'right'}
                        icon={<Icon name={'plus'} />}
                    />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default TopMenu
