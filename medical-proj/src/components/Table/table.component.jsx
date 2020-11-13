import React from 'react'
import { Table } from 'react-bootstrap'
import { TableWrapper } from './styled_components/table.style'

export class TableComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { data, cols, bordered, striped, removeThead, isTableFor } = this.props

        return (
            <TableWrapper>
                <Table
                    responsive
                    hover
                    size="sm"
                    className={`${bordered ? 'table-bordered' : 'table-borderless'} ${striped ? 'table-striped' : ''}`}>
                    <thead className={`${removeThead ? 'd-none' : ''}`}>
                        <tr>
                            {cols.map((headerItem, index) => (
                                <th key={index}>{headerItem.title}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {cols.map((col, key) => (
                                    <td key={key} className={isTableFor}>{col.render(item)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
        )
    }
}
