import React from 'react'
import {
    Menu,
    Input,
    Button,
    Icon,
    Form,
    MenuItem,
    Select,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const TopMenu = (props) => {
    const filterOptions = [
        {
            key: '1',
            value: '1',
            text: 'Quantity BELLOW Minimum Quantity Limit',
        },
        {
            key: '2',
            value: '2',
            text: 'Quantity BELLOW Supply Limit',
        },
        {
            key: '3',
            value: '3',
            text: 'Quantity BELLOW Maximum Quantity Limit',
        },
        {
            key: '4',
            value: '4',
            text: 'ALL',
        },
    ]

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
                    <Select
                        placeholder="فلترة حسب"
                        options={filterOptions}
                        onChange={(e, { value }) =>
                            props.handleTopMenuChange(value, {
                                id: 'filter',
                            })
                        }
                    />
                </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position={'right'}>
                <Menu.Item>
                    <Button
                        as={Link}
                        to={'/cart'}
                        className={'primary'}
                        content={'السلة ' + props.cartCount}
                        labelPosition={'right'}
                        icon={<Icon name={'cart'} />}
                    />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default TopMenu
