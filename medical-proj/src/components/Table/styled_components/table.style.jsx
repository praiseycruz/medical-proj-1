import styled from 'styled-components'

export const TableWrapper = styled.div`
    table {
        border-collapse: collapse;
        border-spacing: 0;
        border-collapse: separate;
        border-spacing: 0;
        color: #4a4a4d;
        font-size: 14px;
        width: 100%;

        tr {
            overflow-x: scroll;
        }

        th,
        td {
            padding: 15px 15px;
            vertical-align: middle;
        }

        thead {
            font-size: 14px;
            line-height: 24px;
            border: 1px solid transparent;
            max-width: 100%;
            font-weight: 900;
            line-height: 24px;
            mix-blend-mode: normal;
            color: #ddd;
            background-color: #333a46;
        }

        thead {
            tr {
                th {
                    padding: 15px 15px;
                    border-bottom: 1px solid #ffffff;

                    &:last-child {
                        text-align: center;
                    }
                }
            }

            &.alerts {
                text-align: center;
            }
        }

        tbody {
            max-width: 100%;

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

                    &:last-child {
                        text-align: center;
                    }

                    &.conditions {
                        &:nth-child(3) {
                            text-align: center;
                        }

                        &:last-child {
                            text-align: right;
                            padding-right: 0;
                        }
                    }

                    &.alerts {
                        text-align: center;

                        &:first-child {
                            span {
                                padding: 6px 12px;
                                background-color: #DC3545;
                                color: #fff;
                                border-radius: 2px;
                            }
                        }

                        button {
                            font-size: 14px;
                            border-radius: 2px;
                        }
                    }

                    &.patients-devices {
                        button {
                            font-size: 13px;
                            border-radius: 2px;
                            margin: 2px;
                        }
                    }
                }
            }
        }

        td {
            padding: 15px 15px;
            border-bottom: 1px solid #424955;
            color: #949ba2;
            text-transform: capitalize;

            .edit {
                font-size: 12px;
                padding: 4px 12px;
            }
        }
    }

    .spinner-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        color: #fff;
    }

    .no-records {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px solid #fff;
        border-bottom: 1px solid #fff;
        padding: 15px;
    }
`
