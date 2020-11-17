import React from 'react'
import { Table, Spinner } from 'react-bootstrap'
import { TableWrapper } from './styled_components/table.style'

export class TableComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { data, cols, bordered, striped, removeThead, isTableFor, loading, total } = this.props

        return (
            <TableWrapper>
                {/* loading !== 'undefined' && loading !== null && !loading ?
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
                            { data.map((item, index) => (
                                <tr key={index}>
                                    {cols.map((col, key) => (
                                        <td key={key} className={isTableFor}>{col.render(item)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    :
                    <div className="spinner-wrapper">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <span className="ml-3">Loading data...</span>
                    </div>
                */}

                { loading !== 'undefined' && loading !== null && !loading ?
                    <>
                        { data.length > 0 ?
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
                                    { data.map((item, index) => (
                                        <tr key={index}>
                                            {cols.map((col, key) => (
                                                <td key={key} className={isTableFor}>{col.render(item)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> :
                            <>
                                { total == 0 &&
                                    <div className="no-records">No records found</div>
                                }
                            </>
                        }
                    </> :
                    <div className="spinner-wrapper">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <span className="ml-3">Loading data...</span>
                    </div>
                }

                { /*total !== 'undefined' && total !== null && total !== 0 ?
                    <>
                        asdasd
                    </>
                    : <>No data</>
                */}
            </TableWrapper>
        )
    }
}
