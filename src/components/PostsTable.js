
import React from 'react';
import { Table, Menu, Dropdown } from 'semantic-ui-react'
import { pathOr } from 'ramda'

// We could make table more generic and configurable (I am skipping this here)
export default function PostsTable({ rows, pagination = { pages: [] } }) {
    const cols = [['title', 'Title'], ['body', 'Body'], ['user.name', 'userName'], ['commentCount', '#comments']]

    const renderBodyRow = (data, index) => (
        <Table.Row key={index}>
            {cols.map(([path, name]) => (
                <Table.Cell key={path}>{pathOr('', path.split("."), data)}</Table.Cell>
            ))}
        </Table.Row>
    )
    const headerRow = cols.map(([path, name]) => (
        <Table.HeaderCell key={path}>{name}</Table.HeaderCell>
    ))

    const footerRow = (
        <Table.Row >
            <Table.HeaderCell>
                <Dropdown text={`show ${pagination.pageSize}/page`}>
                    <Dropdown.Menu>
                        {[5, 10, 20, 100, 200].map(size => (
                            <Dropdown.Item text={size} key={size} selected={pagination.pageSize === size} onClick={() => pagination.setPageSize(size)} />
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={cols.length}>
                <Menu floated='right' pagination>
                    {[...Array(pagination.pageCount).keys()].map(page => (
                        // I have seen that there is a Pagination component - but first used this because it was used in the table example
                        <Menu.Item key={page} onClick={() => pagination.setPageIndex(page)} as='a' active={page === pagination.pageIndex}>{page + 1}</Menu.Item>
                    ))}
                </Menu>
            </Table.HeaderCell>
        </Table.Row>
    )
    return (
        <Table celled compact tableData={rows} renderBodyRow={renderBodyRow} headerRow={headerRow} footerRow={footerRow} />
    )
}