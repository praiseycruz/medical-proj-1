import styled from 'styled-components'

export const TableWrapper = styled.div`
    table {
        td, th {
            color: #949ba2;
            padding: 15px;
            font-size: 14px;
            border-top: 1px solid #4f5467;
        }

        thead {
            border-top: 1px solid #4f5467;
        }

        tbody {
            tr {
                td {
                    &.devices {
                        &:nth-child(1) {
                            padding-top: 20px;
                        }

                        &:nth-child(2) {
                            padding-top: 20px;
                        }

                        &:nth-child(3) {
                            padding-top: 20px;
                        }

                        &:nth-child(4) {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                        }

                        button {
                            font-size: 14px;
                            padding: 5px 20px;
                        }
                    }
                }
            }
        }
    }
`
